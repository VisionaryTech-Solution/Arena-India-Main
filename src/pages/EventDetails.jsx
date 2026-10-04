import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EventGrid from '../components/EventGrid.jsx'
import { StatusBadge, VerificationBadge } from '../components/Badges.jsx'
import { getEventById, getRelatedEvents } from '../services/eventsApi.js'
import ErrorState from '../components/ErrorState.jsx'
import { useAsync } from '../hooks/useAsync.js'
import { getEventContent } from '../data/eventContent.js'
import { formatFullDate } from '../utils/date.js'
import { downloadICS, shareEvent } from '../utils/eventActions.js'

const ICONS = {
  start: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  end: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM9 15l2 2 4-4',
  city: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  state: 'M5 21V4M5 5h12l-2 4 2 4H5',
  venue: 'M4 21V9l8-5 8 5v12M9 21v-6h6v6',
  organiser: 'M16 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM20 20v-1a4 4 0 0 0-3-3.9',
}
const Icon = ({ name }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
)

const safeUrl = (u) => (u && /^https?:\/\//i.test(u) ? u : null)
const secondaryBtn =
  'inline-flex w-full items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/5'

export default function EventDetails() {
  const { id } = useParams()
  const [shareMsg, setShareMsg] = useState('')

  const { data, error, loading, reload } = useAsync(async ({ force }) => {
    const event = await getEventById(id, { force })
    return { event, related: event ? await getRelatedEvents(event, { force }) : [] }
  }, [id])
  const e = data?.event ?? null
  const related = data?.related ?? []
  useEffect(() => { document.title = e ? `${e.event_name} | Arena India` : 'Arena India' }, [e])

  const onShare = async () => {
    const r = await shareEvent(e)
    if (r === 'copied') {
      setShareMsg('Link copied to clipboard')
      setTimeout(() => setShareMsg(''), 2500)
    }
  }

  if (loading) {
    return <div className="container-page py-16"><div className="h-96 animate-pulse rounded-3xl bg-navy-900" /></div>
  }

  if (error) {
    return (
      <div className="container-page py-16">
        <ErrorState title="Event couldn&rsquo;t be loaded" onRetry={reload} />
      </div>
    )
  }

  if (!e) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Event not found</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">This event may have been removed or the link is incorrect.</p>
        <Link to="/events" className="btn-primary mt-8 px-7 py-3">&larr; Back to Events</Link>
      </section>
    )
  }

  const ticketUrl = safeUrl(e.ticket_registration_url)
  const officialUrl = safeUrl(e.official_url)
  const info = [
    ['start', 'Start Date', formatFullDate(e.start_date)],
    ['end', 'End Date', formatFullDate(e.end_date)],
    ['city', 'City', e.city],
    ['state', 'State', e.state],
    ['venue', 'Venue', e.venue],
    ['organiser', 'Organiser', e.organiser],
  ]

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <nav aria-label="Breadcrumb" className="min-w-0 text-slate-500">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-slate-300" aria-current="page">{e.event_name}</li>
          </ol>
        </nav>
        <Link to="/events" className="font-bold text-accent hover:text-accent-soft">&larr; Back to Events</Link>
      </div>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-soft">{e.sport}</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">{e.event_category}</span>
          <StatusBadge status={e.event_status} />
          <VerificationBadge status={e.verification_status} />
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">{e.event_name}</h1>
        {e.is_demo && <p className="mt-3 text-sm text-slate-500">Demo listing. This event is fictional sample data.</p>}
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-8">
          <section aria-labelledby="info" className="rounded-2xl border border-white/10 bg-navy-900 p-6 sm:p-8">
            <h2 id="info" className="text-xl font-bold">Event information</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {info.map(([icon, label, value]) => (
                <div key={label} className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><Icon name={icon} /></span>
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">{label}</dt>
                    <dd className="mt-0.5 font-medium text-white">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          {/* Content area: swap getEventContent() output for real descriptions later. Kept apart from structured fields. */}
          <section aria-label="Event description" className="space-y-7 rounded-2xl border border-white/10 bg-navy-900 p-6 sm:p-8">
            {getEventContent(e).map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold">{s.title}</h2>
                <p className="mt-2 max-w-prose leading-relaxed">{s.body}</p>
              </div>
            ))}
            <p className="text-xs text-slate-500">Placeholder text generated from the listing details.</p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-3 rounded-2xl border border-white/10 bg-navy-900 p-6">
            {ticketUrl ? (
              <a href={ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full py-3.5 text-base">Tickets / Register</a>
            ) : (
              <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-slate-400">
                Ticket or registration information is not available yet.
              </p>
            )}
            {officialUrl && (
              <a href={officialUrl} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>Official Website</a>
            )}
            <button type="button" onClick={() => downloadICS(e)} className={secondaryBtn}>Add to Calendar</button>
            <button type="button" onClick={onShare} className={secondaryBtn}>Share Event</button>
            <p className="min-h-5 text-center text-sm text-emerald-300" role="status">{shareMsg}</p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related">
          <h2 id="related" className="mb-8 text-3xl font-extrabold">Related Events</h2>
          <EventGrid events={related} />
        </section>
      )}
    </div>
  )
}
