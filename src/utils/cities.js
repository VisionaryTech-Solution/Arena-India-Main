const iso = (d) => d.toLocaleDateString('en-CA')

export const PIN_ICON = 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'
const TONES = ['#1B8FD9', '#1FA96A', '#E5541B', '#A25BE0', '#22B3C2', '#E0476D', '#F0A81C', '#6C72E8']

// Stable accent per city so cards look varied but never change between renders.
export const cityTone = (name) => TONES[[...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % TONES.length]

export const cityEventsUrl = (name) => `/events?city=${encodeURIComponent(name)}`

// Cities are derived from the event data (there is no separate city list).
// count    = every event in that city (exactly what /events?city=<name> lists)
// upcoming = not completed and not yet finished, soonest first
export function summarizeCities(events, now = new Date()) {
  const today = iso(now)
  const byCity = new Map()
  for (const e of events) {
    if (!byCity.has(e.city)) byCity.set(e.city, { name: e.city, state: e.state, count: 0, upcoming: [] })
    const c = byCity.get(e.city)
    c.count += 1
    if (e.event_status !== 'Completed' && e.end_date >= today) c.upcoming.push(e)
  }
  const list = [...byCity.values()]
  list.forEach((c) => c.upcoming.sort((a, b) => a.start_date.localeCompare(b.start_date)))
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

// Popularity = number of events in the data. Ties: more upcoming events, then name. No invented stats.
export const popularCities = (cities, n = 3) =>
  [...cities].sort((a, b) => b.count - a.count || b.upcoming.length - a.upcoming.length || a.name.localeCompare(b.name)).slice(0, n)

// Matches city name or state, ignoring case and extra spaces.
export function searchCities(cities, q) {
  const t = q.trim().toLowerCase()
  return t ? cities.filter((c) => c.name.toLowerCase().includes(t) || c.state.toLowerCase().includes(t)) : cities
}

// When a search narrows the list to a few cities, show their upcoming events too.
export const previewTargets = (q, matches) => (q.trim() && matches.length > 0 && matches.length <= 3 ? matches : [])
