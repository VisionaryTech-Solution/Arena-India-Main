import { useMemo, useState } from 'react'
import SportCard from '../components/SportCard.jsx'
import SportPreview from '../components/SportPreview.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { getEvents } from '../services/eventsApi.js'
import ErrorState from '../components/ErrorState.jsx'
import { useAsync } from '../hooks/useAsync.js'
import { summarizeSports, popularSports } from '../utils/sports.js'

export default function Sports() {
  const { data: events, error, reload } = useAsync(({ force }) => getEvents({ force }))
  const [q, setQ] = useState('')

  const sports = useMemo(() => (events ? summarizeSports(events) : []), [events])
  const popular = useMemo(() => popularSports(sports, 3), [sports])
  const term = q.trim().toLowerCase()
  const matches = term ? sports.filter((s) => s.name.toLowerCase().includes(term)) : sports
  // Searching down to a few sports shows their upcoming events too (including the "no events" state).
  const previews = term && matches.length > 0 && matches.length <= 3 ? matches : []

  return (
    <>
      <section className="border-b border-white/10">
        <div className="container-page py-14 sm:py-20">
          <h1 className="text-4xl font-extrabold sm:text-6xl">Explore Sports</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">Discover upcoming events across your favourite sports.</p>
          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-white/15 bg-navy-900/80 px-5 transition focus-within:border-accent/70">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8A97C0" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
              <circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" />
            </svg>
            <label htmlFor="sports-search" className="sr-only">Search sports</label>
            <input
              id="sports-search"
              type="text"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sports..."
              className="min-w-0 flex-1 bg-transparent py-4 text-base text-white placeholder:text-slate-500 focus:outline-none sm:text-lg"
            />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" /></svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {error && <div className="container-page mt-10"><ErrorState title="Sports couldn&rsquo;t be loaded" onRetry={reload} /></div>}
      {!events && !error && (
        <div className="container-page mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-44 animate-pulse rounded-2xl bg-navy-900" />)}
        </div>
      )}

      {events && (
        <>
          {!term && popular.length > 0 && (
            <section className="container-page pt-14" aria-labelledby="popular">
              <SectionHeading title="Popular Sports" subtitle="The sports with the most events listed right now." />
              <div className="space-y-6">
                {popular.map((s) => <SportPreview key={s.name} sport={s} />)}
              </div>
            </section>
          )}

          <section className="container-page pt-16" aria-labelledby="all-sports">
            <SectionHeading title="All Sports" subtitle={term ? `${matches.length} ${matches.length === 1 ? 'sport' : 'sports'} found` : undefined} />
            {matches.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {matches.map((s) => (
                  <SportCard key={s.name} sport={s} cta meta={s.count > 0 ? `${s.count} ${s.count === 1 ? 'event' : 'events'}` : 'No events yet'} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/15 bg-navy-900/50 px-6 py-14 text-center">
                <h3 className="text-2xl font-extrabold">No sports found</h3>
                <p className="mt-2 text-slate-400">Try a different name.</p>
                <button type="button" onClick={() => setQ('')} className="btn-primary mt-6 px-6 py-3">Show all sports</button>
              </div>
            )}
          </section>

          {previews.length > 0 && (
            <section className="container-page pt-16">
              <SectionHeading title="Upcoming events" />
              <div className="space-y-6">{previews.map((s) => <SportPreview key={s.name} sport={s} />)}</div>
            </section>
          )}
        </>
      )}
    </>
  )
}
