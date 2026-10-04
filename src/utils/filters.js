export const EMPTY_FILTERS = { q: '', sport: '', state: '', city: '', category: '', status: '', date: '', on: '' }
export const FILTER_KEYS = Object.keys(EMPTY_FILTERS)
export const STATUSES = ['Upcoming', 'Registration Open', 'Live', 'Completed']
export const DATE_PRESETS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'upcoming', label: 'Upcoming' },
]
const SEARCH_FIELDS = ['event_name', 'sport', 'city', 'state', 'venue', 'organiser', 'event_category']
const iso = (d) => d.toLocaleDateString('en-CA')
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/

// Returns [firstDay, lastDay] as ISO strings, or null for "all dates". Events match if they overlap the window.
export function getDateWindow(f, now = new Date()) {
  if (ISO_RE.test(f.on)) return [f.on, f.on]
  const today = iso(now)
  if (f.date === 'today') return [today, today]
  if (f.date === 'upcoming') return [today, '9999-12-31']
  if (f.date === 'week') {
    const mon = new Date(now)
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7))
    const sun = new Date(mon)
    sun.setDate(mon.getDate() + 6)
    return [iso(mon), iso(sun)]
  }
  if (f.date === 'month') {
    return [iso(new Date(now.getFullYear(), now.getMonth(), 1)), iso(new Date(now.getFullYear(), now.getMonth() + 1, 0))]
  }
  return null
}

// Every search word must appear somewhere in the event's text fields (any order, any case).
export function filterEvents(events, f, now = new Date()) {
  const words = f.q.toLowerCase().split(/\s+/).filter(Boolean)
  const win = getDateWindow(f, now)
  return events
    .filter((e) => {
      if (f.sport && e.sport !== f.sport) return false
      if (f.state && e.state !== f.state) return false
      if (f.city && e.city !== f.city) return false
      if (f.category && e.event_category !== f.category) return false
      if (f.status && e.event_status !== f.status) return false
      if (win && !(e.end_date >= win[0] && e.start_date <= win[1])) return false
      if (words.length) {
        const hay = SEARCH_FIELDS.map((k) => e[k] || '').join(' ').toLowerCase()
        if (!words.every((w) => hay.includes(w))) return false
      }
      return true
    })
    .sort((a, b) => a.start_date.localeCompare(b.start_date))
}

// Options come from the data. Cities narrow to the chosen state. A value coming from the URL is always
// kept in its list so the dropdown never shows something different from what is being filtered.
export function getFilterOptions(events, f) {
  const uniq = (arr, keep) => [...new Set([...arr, ...(keep ? [keep] : [])])].sort()
  return {
    sports: uniq(events.map((e) => e.sport), f.sport),
    states: uniq(events.map((e) => e.state), f.state),
    cities: uniq(events.filter((e) => !f.state || e.state === f.state).map((e) => e.city), f.city),
    categories: uniq(events.map((e) => e.event_category), f.category),
    statuses: STATUSES.filter((s) => events.some((e) => e.event_status === s) || s === f.status),
  }
}
