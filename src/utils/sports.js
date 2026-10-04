import { SPORTS, DEFAULT_SPORT } from '../data/sports.js'

const iso = (d) => d.toLocaleDateString('en-CA')

// One summary per sport, computed from the event list (no hardcoded numbers).
// count    = every event for that sport (exactly what /events?sport=<name> lists)
// upcoming = events not completed and not yet finished, soonest first
export function summarizeSports(events, now = new Date()) {
  const today = iso(now)
  const known = new Map(SPORTS.map((s) => [s.name, s]))
  const extras = [...new Set(events.map((e) => e.sport))].filter((n) => !known.has(n)).sort()
  return [...SPORTS.map((s) => s.name), ...extras].map((name) => {
    const mine = events.filter((e) => e.sport === name)
    const upcoming = mine
      .filter((e) => e.event_status !== 'Completed' && e.end_date >= today)
      .sort((a, b) => a.start_date.localeCompare(b.start_date))
    return { ...DEFAULT_SPORT, ...known.get(name), name, count: mine.length, upcoming }
  })
}

// Popularity = number of events in the data. Ties: more upcoming events, then name. No invented stats.
export const popularSports = (summaries, n = 3) =>
  summaries
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count || b.upcoming.length - a.upcoming.length || a.name.localeCompare(b.name))
    .slice(0, n)

export const sportEventsUrl = (name) => `/events?sport=${encodeURIComponent(name)}`
