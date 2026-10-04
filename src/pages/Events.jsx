import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar.jsx'
import EventGrid from '../components/EventGrid.jsx'
import { getEvents } from '../services/eventsApi.js'
import ErrorState from '../components/ErrorState.jsx'
import { useAsync } from '../hooks/useAsync.js'
import DataNotice from '../components/DataNotice.jsx'
import { EMPTY_FILTERS, FILTER_KEYS, filterEvents, getFilterOptions } from '../utils/filters.js'

export default function Events() {
  const { data: events, error, reload } = useAsync(({ force }) => getEvents({ force }))
  const [params, setParams] = useSearchParams()

  // Filter state lives in the URL, so filtered pages are shareable and the homepage links work.
  const filters = useMemo(
    () => Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k) || ''])),
    [params],
  )

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    if (key === 'state') next.delete('city')
    if (key === 'date') next.delete('on') // preset and specific date are mutually exclusive
    if (key === 'on') next.delete('date')
    setParams(next, { replace: true })
  }
  const clearAll = () => setParams({}, { replace: true })

  const results = useMemo(() => (events ? filterEvents(events, filters) : []), [events, filters])
  const options = useMemo(() => getFilterOptions(events || [], filters), [events, filters])
  const activeCount = FILTER_KEYS.filter((k) => filters[k]).length

  return (
    <>
      <section className="border-b border-white/10">
        <div className="container-page py-14 sm:py-20">
          <h1 className="text-4xl font-extrabold sm:text-6xl">Explore Events</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Browse sports events across India by sport, city, category and date. Listings shown are demo data for now.
          </p>
          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-white/15 bg-navy-900/80 px-5 transition focus-within:border-accent/70">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8A97C0" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
              <circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" />
            </svg>
            <label htmlFor="events-search" className="sr-only">Search events</label>
            <input
              id="events-search"
              type="text"
              enterKeyHint="search"
              autoComplete="off"
              value={filters.q}
              onChange={(e) => setFilter('q', e.target.value)}
              placeholder="Search events, sports or cities..."
              className="min-w-0 flex-1 bg-transparent py-4 text-base text-white placeholder:text-slate-500 focus:outline-none sm:text-lg"
            />
            {filters.q && (
              <button type="button" onClick={() => setFilter('q', '')} aria-label="Clear search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-page pt-8">
        <FilterBar filters={filters} options={options} onChange={setFilter} onClear={clearAll} activeCount={activeCount} resultCount={results.length} />

        {events && <DataNotice />}
        <p className="mb-5 mt-8 text-sm font-medium text-slate-300" aria-live="polite">
          {error ? '' : !events ? 'Loading events...' : results.length === 0 ? 'No events found' : `${results.length} ${results.length === 1 ? 'event' : 'events'} found`}
        </p>

        {error && <ErrorState onRetry={reload} />}
        {!events && !error && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-72 animate-pulse rounded-2xl bg-navy-900" />)}
          </div>
        )}
        {events && results.length > 0 && <EventGrid events={results} />}
        {events && results.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/15 bg-navy-900/50 px-6 py-16 text-center">
            <h2 className="text-2xl font-extrabold sm:text-3xl">No events found</h2>
            <p className="mx-auto mt-3 max-w-md text-slate-400">Try changing your search or filters.</p>
            <button type="button" onClick={clearAll} className="btn-primary mt-7 px-7 py-3">Clear Filters</button>
          </div>
        )}
      </section>
    </>
  )
}
