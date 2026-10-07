import { useMemo, useState } from 'react'
import CityCard from '../components/CityCard.jsx'
import CityPreview from '../components/CityPreview.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { getEvents } from '../services/eventsApi.js'
import ErrorState from '../components/ErrorState.jsx'
import { useAsync } from '../hooks/useAsync.js'
import { summarizeCities, popularCities, searchCities, previewTargets } from '../utils/cities.js'

export default function Cities() {
  const { data: events, error, reload } = useAsync(({ force }) => getEvents({ force }))
  const [q, setQ] = useState('')

  const cities = useMemo(() => (events ? summarizeCities(events) : []), [events])
  const popular = useMemo(() => popularCities(cities, 3), [cities])
  const matches = searchCities(cities, q)
  const previews = previewTargets(q, matches)
  const searching = q.trim().length > 0

  return (
    <>
      {/* Header */}
      <section className="border-b border-gray-200 bg-charcoal" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="container-page py-16 sm:py-20">
          <div className="mb-2 h-1 w-12 bg-red-600" />
          <h1 className="font-display max-w-3xl text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl">
            Events Across India
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">Find sporting events happening across India.</p>

          <div className="mt-8 flex max-w-2xl items-center gap-3 border-2 border-white/20 bg-white/10 px-5 backdrop-blur transition focus-within:border-red-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff80" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
              <circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" />
            </svg>
            <label htmlFor="cities-search" className="sr-only">Search cities</label>
            <input
              id="cities-search"
              type="text"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cities..."
              className="min-w-0 flex-1 bg-transparent py-4 text-base text-white placeholder:text-white/40 focus:outline-none sm:text-lg"
            />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="grid h-9 w-9 shrink-0 place-items-center text-white/50 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {error && <div className="container-page mt-10"><ErrorState title="Cities couldn't be loaded" onRetry={reload} /></div>}
      {!events && !error && (
        <div className="container-page mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-44 animate-pulse bg-gray-200" />)}
        </div>
      )}

      {events && (
        <div className="bg-offwhite py-12">
          {!searching && popular.length > 0 && (
            <section className="container-page mb-16" aria-labelledby="popular">
              <SectionHeading title="Popular Locations" subtitle="The cities with the most events listed right now." />
              <div className="space-y-6">
                {popular.map((c) => <CityPreview key={c.name} city={c} />)}
              </div>
            </section>
          )}

          <section className="container-page" aria-labelledby="all-cities">
            <SectionHeading
              title="All Cities"
              subtitle={searching ? `${matches.length} ${matches.length === 1 ? 'city' : 'cities'} found` : undefined}
            />
            {matches.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((c) => <CityCard key={c.name} city={c} count={c.count} cta />)}
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <h3 className="font-display text-2xl font-extrabold uppercase text-charcoal">No cities found</h3>
                <p className="mt-2 text-gray-500">Try a different city or state name.</p>
                <button type="button" onClick={() => setQ('')} className="mt-6 bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                  Show all cities
                </button>
              </div>
            )}
          </section>

          {previews.length > 0 && (
            <section className="container-page mt-16">
              <SectionHeading title="Upcoming Events" />
              <div className="space-y-6">{previews.map((c) => <CityPreview key={c.name} city={c} />)}</div>
            </section>
          )}
        </div>
      )}
    </>
  )
}
