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

const SPORT_IMAGES = {
  Cricket: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80',
  Football: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
  Running: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80',
  Basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80',
  Tennis: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80',
  Badminton: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&q=80',
  Hockey: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=1200&q=80',
  Kabaddi: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80',
}

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
    return (
      <div>
        <div className="h-72 animate-pulse bg-gray-200" />
        <div className="container-page py-10">
          <div className="h-10 w-2/3 animate-pulse bg-gray-200" />
          <div className="mt-4 h-6 w-1/3 animate-pulse bg-gray-100" />
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="container-page py-16"><ErrorState title="Event couldn't be loaded" onRetry={reload} /></div>
  }

  if (!e) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold uppercase text-charcoal sm:text-5xl">Event not found</h1>
        <p className="mx-auto mt-4 max-w-md text-gray-500">This event may have been removed or the link is incorrect.</p>
        <Link to="/events" className="mt-8 inline-block bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-700">
          ← Back to Events
        </Link>
      </section>
    )
  }

  const ticketUrl = safeUrl(e.ticket_registration_url)
  const officialUrl = safeUrl(e.official_url)
  const heroImg = SPORT_IMAGES[e.sport] || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80'

  const info = [
    ['start', 'Start Date', formatFullDate(e.start_date)],
    ['end', 'End Date', formatFullDate(e.end_date)],
    ['city', 'City', e.city],
    ['state', 'State', e.state],
    ['venue', 'Venue', e.venue],
    ['organiser', 'Organiser', e.organiser],
  ]

  return (
    <div>
      {/* Hero image */}
      <div className="relative h-72 overflow-hidden sm:h-96">
        <img src={heroImg} alt={e.sport} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="container-page">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{e.sport}</span>
              <span className="bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">{e.event_category}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-5xl">
              {e.event_name}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-offwhite">
        <div className="container-page py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li><Link to="/" className="hover:text-red-600">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/events" className="hover:text-red-600">Events</Link></li>
              <li aria-hidden="true">/</li>
              <li className="truncate text-charcoal" aria-current="page">{e.event_name}</li>
            </ol>
          </nav>

          {e.is_demo && <p className="mb-4 text-sm text-gray-400">Demo listing — fictional sample data.</p>}

          <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-6">
              {/* Event info */}
              <section aria-labelledby="info" className="border border-gray-200 bg-white p-6 sm:p-8">
                <h2 id="info" className="font-display text-xl font-bold uppercase text-charcoal">Event Information</h2>
                <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                  {info.map(([icon, label, value]) => (
                    <div key={label} className="flex gap-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center bg-red-50 text-red-600">
                        <Icon name={icon} />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs text-gray-400">{label}</dt>
                        <dd className="mt-0.5 font-medium text-charcoal">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Description */}
              <section aria-label="Event description" className="space-y-6 border border-gray-200 bg-white p-6 sm:p-8">
                {getEventContent(e).map((s) => (
                  <div key={s.title}>
                    <h2 className="font-display text-xl font-bold uppercase text-charcoal">{s.title}</h2>
                    <p className="mt-2 max-w-prose leading-relaxed text-gray-600">{s.body}</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400">Placeholder text generated from the listing details.</p>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-3 border border-gray-200 bg-white p-6">
                <div className="flex flex-wrap gap-2 pb-3">
                  <StatusBadge status={e.event_status} />
                  <VerificationBadge status={e.verification_status} />
                </div>

                {ticketUrl ? (
                  <a
                    href={ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-red-600 py-4 text-center text-base font-bold text-white transition hover:bg-red-700"
                  >
                    Tickets / Register →
                  </a>
                ) : (
                  <p className="border border-dashed border-gray-200 p-4 text-sm text-gray-400">
                    Ticket or registration information is not available yet.
                  </p>
                )}

                {officialUrl && (
                  <a
                    href={officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border-2 border-charcoal py-3 text-center text-sm font-bold text-charcoal transition hover:bg-charcoal hover:text-white"
                  >
                    Official Website
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => downloadICS(e)}
                  className="block w-full border-2 border-gray-200 py-3 text-center text-sm font-bold text-charcoal transition hover:border-charcoal"
                >
                  Add to Calendar
                </button>

                <button
                  type="button"
                  onClick={onShare}
                  className="block w-full border-2 border-gray-200 py-3 text-center text-sm font-bold text-charcoal transition hover:border-charcoal"
                >
                  Share Event
                </button>

                <p className="min-h-5 text-center text-sm text-emerald-600" role="status">{shareMsg}</p>
              </div>

              <Link
                to="/events"
                className="mt-3 block border-2 border-gray-200 py-3 text-center text-sm font-bold text-gray-500 transition hover:border-red-600 hover:text-red-600"
              >
                ← Back to Events
              </Link>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20" aria-labelledby="related">
              <div className="mb-3 h-1 w-12 bg-red-600" />
              <h2 id="related" className="mb-8 font-display text-3xl font-extrabold uppercase text-charcoal">
                Related Events
              </h2>
              <EventGrid events={related} />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
