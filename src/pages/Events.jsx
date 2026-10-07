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

  const filters = useMemo(
    () => Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k) || ''])),
    [params],
  )

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    if (key === 'state') next.delete('city')
    if (key === 'date') next.delete('on')
    if (key === 'on') next.delete('date')
    setParams(next, { replace: true })
  }
  const clearAll = () => setParams({}, { replace: true })

  const results = useMemo(() => (events ? filterEvents(events, filters) : []), [events, filters])
  const options = useMemo(() => getFilterOptions(events || [], filters), [events, filters])
  const activeCount = FILTER_KEYS.filter((k) => filters[k]).length

  return (
    <>
      {/* Page header */}
      <section className="border-b border-gray-200 bg-charcoal" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="container-page py-16 sm:py-20">
          <div className="mb-2 h-1 w-12 bg-red-600" />
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl">
            Explore Events
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Browse sports events across India by sport, city, category and date.
          </p>

          {/* Search */}
          <div className="mt-8 flex max-w-2xl items-center gap-3 border-2 border-white/20 bg-white/10 px-5 backdrop-blur transition focus-within:border-red-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff80" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
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
              className="min-w-0 flex-1 bg-transparent py-4 text-base text-white placeholder:text-white/40 focus:outline-none sm:text-lg"
            />
            {filters.q && (
              <button type="button" onClick={() => setFilter('q', '')} aria-label="Clear search" className="grid h-9 w-9 shrink-0 place-items-center text-white/50 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-8">
        <div className="container-page">
          <FilterBar filters={filters} options={options} onChange={setFilter} onClear={clearAll} activeCount={activeCount} resultCount={results.length} />

          {events && <DataNotice />}
          <p className="mb-5 mt-8 text-sm font-medium text-gray-600" aria-live="polite">
            {error ? '' : !events ? 'Loading events...' : results.length === 0 ? 'No events found' : `${results.length} ${results.length === 1 ? 'event' : 'events'} found`}
          </p>

          {error && <ErrorState onRetry={reload} />}
          {!events && !error && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((i) => <div key={i} className="h-72 animate-pulse bg-gray-200" />)}
            </div>
          )}
          {events && results.length > 0 && <EventGrid events={results} />}
          {events && results.length === 0 && (
            <div className="border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <h2 className="font-display text-2xl font-extrabold uppercase text-charcoal sm:text-3xl">No events found</h2>
              <p className="mx-auto mt-3 max-w-md text-gray-500">Try changing your search or filters.</p>
              <button type="button" onClick={clearAll} className="mt-7 bg-red-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
