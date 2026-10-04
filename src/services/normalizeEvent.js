// The only file that knows about Google Sheet column names ("Event Name", "Start Date", ...).
// It accepts sheet-style headers OR snake_case keys and always returns the shape the UI expects:
// { id, event_name, sport, event_category, start_date, end_date, city, state, venue, organiser,
//   official_url, ticket_registration_url, event_status, verification_status, last_updated, is_demo }

const key = (k) => String(k).toLowerCase().replace(/[^a-z0-9]/g, '')

// normalized column name -> app field. Add an alias here if a sheet column is ever renamed.
const ALIASES = {
  id: ['eventid', 'id'],
  event_name: ['eventname', 'name', 'title'],
  sport: ['sport'],
  event_category: ['eventcategory', 'category'],
  start_date: ['startdate', 'start'],
  end_date: ['enddate', 'end'],
  city: ['city'],
  state: ['state'],
  venue: ['venue', 'location'],
  organiser: ['organiser', 'organizer'],
  official_url: ['officialurl', 'officialwebsite', 'website'],
  ticket_registration_url: ['ticketregistrationurl', 'ticketurl', 'registrationurl'],
  event_status: ['eventstatus', 'status'],
  verification_status: ['verificationstatus'],
  last_updated: ['lastupdated', 'updatedat'],
}

const text = (v) => (v == null ? '' : String(v).trim())
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function validYMD(y, m, d) {
  const dt = new Date(Date.UTC(y, m - 1, d))
  const ok = dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d
  return ok ? `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null
}

// Accepts 2028-03-10, 2028-03-10T00:00:00Z, 10/03/2028 (day first, as in India), Sheets serial numbers, "10 Mar 2028".
export function toISODate(v) {
  if (v == null || v === '') return null
  if (typeof v === 'number') {
    if (v < 20000 || v > 80000) return null
    const d = new Date(Date.UTC(1899, 11, 30) + v * 864e5)
    return validYMD(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate())
  }
  const s = text(v)
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:$|[T\s])/)
  if (m) return validYMD(+m[1], +m[2], +m[3])
  m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/)
  if (m) return validYMD(+m[3], +m[2], +m[1])
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : validYMD(d.getFullYear(), d.getMonth() + 1, d.getDate())
}

// Returns a safe http(s) URL or null. Blank / "N/A" / "TBD" / javascript: etc. all become null (the UI then shows its "not available" text).
export function cleanUrl(v) {
  let s = text(v)
  if (!s || /^(null|undefined|n\/?a|none|tbd|-)$/i.test(s)) return null
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) {
    if (!/^[^\s/]+\.[^\s/]+/.test(s)) return null
    s = `https://${s}`
  }
  try {
    const u = new URL(s)
    return /^https?:$/.test(u.protocol) ? u.href : null
  } catch {
    return null
  }
}

const STATUS = { upcoming: 'Upcoming', registrationopen: 'Registration Open', registrationsopen: 'Registration Open', live: 'Live', ongoing: 'Live', inprogress: 'Live', completed: 'Completed', past: 'Completed', finished: 'Completed' }
const VERIFY = { verified: 'Verified', pending: 'Pending', underreview: 'Pending', unverified: 'Unverified' }

// Returns a normalized event, or null when the row cannot be shown (no name, no usable start date, or no city).
export function normalizeEvent(raw) {
  if (!raw || typeof raw !== 'object') return null
  const cols = {}
  for (const k of Object.keys(raw)) cols[key(k)] = raw[k]
  const get = (field) => {
    for (const a of ALIASES[field]) if (cols[a] != null && text(cols[a]) !== '') return cols[a]
    return undefined
  }

  const event_name = text(get('event_name'))
  const start_date = toISODate(get('start_date'))
  const city = text(get('city'))
  if (!event_name || !start_date || !city) return null

  let end_date = toISODate(get('end_date')) || start_date
  if (end_date < start_date) end_date = start_date

  return {
    id: text(get('id')) || slug(`${event_name}-${city}`),
    event_name,
    sport: text(get('sport')) || 'Other',
    event_category: text(get('event_category')) || 'Event',
    start_date,
    end_date,
    city,
    state: text(get('state')),
    venue: text(get('venue')) || 'Venue to be announced',
    organiser: text(get('organiser')) || 'Organiser not listed',
    official_url: cleanUrl(get('official_url')),
    ticket_registration_url: cleanUrl(get('ticket_registration_url')),
    event_status: STATUS[key(text(get('event_status')))] || text(get('event_status')) || 'Upcoming',
    verification_status: VERIFY[key(text(get('verification_status')))] || 'Unverified',
    last_updated: text(get('last_updated')) || null,
    is_demo: raw.is_demo === true,
  }
}

// Normalizes a list, drops unusable rows and duplicate ids (first one wins).
export function normalizeEvents(rows) {
  const seen = new Set()
  const out = []
  for (const r of rows) {
    const e = normalizeEvent(r)
    if (!e || seen.has(e.id)) continue
    seen.add(e.id)
    out.push(e)
  }
  if (out.length < rows.length) console.warn(`[events] ${rows.length - out.length} of ${rows.length} rows skipped (invalid or duplicate).`)
  return out
}
