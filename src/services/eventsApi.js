// Events service. The whole app gets events through these functions, never from mock data directly.
//
// Configuration (see .env.example):
//   VITE_EVENTS_API_URL          URL of a JSON endpoint that returns the events (n8n webhook / backend).
//   VITE_ALLOW_MOCK_FALLBACK     "true" to show demo data when the API fails in a production build.
//                                (Always allowed during `npm run dev`.)
// No credentials live in the frontend. The endpoint must be public read-only data (and allow CORS).
import { MOCK_EVENTS } from '../data/mockEvents.js'
import { normalizeEvents } from './normalizeEvent.js'

const env = import.meta.env
const API_URL = (env.VITE_EVENTS_API_URL || '').trim()
const ALLOW_FALLBACK = Boolean(env.DEV) || env.VITE_ALLOW_MOCK_FALLBACK === 'true'
const TIMEOUT_MS = 10000
const CACHE_MS = 60000

let status = { source: 'mock', fellBack: false, error: null }
let cache = null

// Where the last load came from: { source: 'api' | 'mock', fellBack, error }.
export const getDataStatus = () => ({ ...status })

// Accepts a bare array, { events | data | items | records: [...] }, n8n items ([{ json: {...} }])
// or a Google Sheets style { values: [[headers], [row], ...] }.
function extractRows(body) {
  let rows = Array.isArray(body) ? body : body && typeof body === 'object' ? body.events ?? body.data ?? body.items ?? body.records ?? body.values : null
  if (!Array.isArray(rows)) throw new Error('The events API returned an unexpected format (expected a JSON array of events).')
  if (Array.isArray(rows[0])) {
    const [headers, ...data] = rows
    rows = data.map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i]])))
  }
  return rows.map((r) => (r && typeof r === 'object' && r.json && typeof r.json === 'object' && !Array.isArray(r.json) ? r.json : r))
}

async function fetchRemote() {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(API_URL, { headers: { Accept: 'application/json' }, signal: ctl.signal })
    if (!res.ok) throw new Error(`The events API responded with status ${res.status}.`)
    try {
      return await res.json()
    } catch {
      throw new Error('The events API did not return valid JSON.')
    }
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('The events API took too long to respond.')
    throw err
  } finally {
    clearTimeout(timer)
  }
}

async function load() {
  if (!API_URL) {
    status = { source: 'mock', fellBack: false, error: null }
    return normalizeEvents(MOCK_EVENTS)
  }
  try {
    const events = normalizeEvents(extractRows(await fetchRemote()))
    status = { source: 'api', fellBack: false, error: null }
    return events
  } catch (err) {
    if (!ALLOW_FALLBACK) throw err
    console.warn('[events] API unavailable, using demo data:', err.message)
    status = { source: 'mock', fellBack: true, error: err.message }
    return normalizeEvents(MOCK_EVENTS)
  }
}

// All events (normalized). Cached for a minute so page changes don't refetch; { force: true } skips the cache (Retry).
export function getEvents({ force = false } = {}) {
  if (!force && cache && Date.now() - cache.at < CACHE_MS) return cache.promise
  const promise = load().catch((err) => {
    if (cache?.promise === promise) cache = null // never cache a failure
    throw err
  })
  cache = { promise, at: Date.now() }
  return promise
}

const same = (a, b) => String(a).toLowerCase() === String(b).toLowerCase()

// Resolves to the event, or null when no event has that id. Rejects only when the API fails.
// (Swap the body for a request to `${API_URL}/${id}` if the backend ever offers a single-event endpoint.)
export async function getEventById(id, opts) {
  return (await getEvents(opts)).find((e) => e.id === id) || null
}
export async function getEventsBySport(sport, opts) {
  return (await getEvents(opts)).filter((e) => same(e.sport, sport))
}
export async function getEventsByCity(city, opts) {
  return (await getEvents(opts)).filter((e) => same(e.city, city))
}

const todayISO = () => new Date().toLocaleDateString('en-CA')

export async function getUpcomingEvents({ limit, force } = {}) {
  const today = todayISO()
  const upcoming = (await getEvents({ force }))
    .filter((e) => e.event_status !== 'Completed' && e.end_date >= today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date))
  return limit ? upcoming.slice(0, limit) : upcoming
}

// Same sport AND city ranks first, then same sport, then same city. Active events beat completed ones.
export async function getRelatedEvents(event, { limit = 3, force } = {}) {
  const score = (e) => (e.sport === event.sport ? 2 : 0) + (e.city === event.city ? 1 : 0) + (e.event_status !== 'Completed' ? 0.5 : 0)
  return (await getEvents({ force }))
    .filter((e) => e.id !== event.id && (e.sport === event.sport || e.city === event.city))
    .sort((a, b) => score(b) - score(a) || a.start_date.localeCompare(b.start_date))
    .slice(0, limit)
}
