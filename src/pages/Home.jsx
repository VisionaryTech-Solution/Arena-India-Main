import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import EventCard from '../components/EventCard.jsx'
import EventCarousel from '../components/EventCarousel.jsx'
import SportCard from '../components/SportCard.jsx'
import CityCard from '../components/CityCard.jsx'
import { getUpcomingEvents, getLatestUpcomingEvents } from '../services/eventsApi.js'
import ErrorState from '../components/ErrorState.jsx'
import { useAsync } from '../hooks/useAsync.js'
import { SPORTS } from '../data/sports.js'
import { CITIES } from '../data/cities.js'

const SPORT_IMAGES = {
  cricket:        '/sports/cricket.jpg',
  football:       '/sports/football.jpg',
  basketball:     '/sports/basketball.jpg',
  volleyball:     '/sports/volleyball.jpg',
  tennis:         '/sports/tennis.jpg',
  badminton:      '/sports/badminton.jpg',
  hockey:         '/sports/hockey.jpg',
  kabaddi:        '/sports/kabaddi.jpg',
  running:        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80',
  athletics:      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  swimming:       'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80',
  boxing:         'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900&q=80',
  gymnastics:     'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=900&q=80',
  'table tennis': 'https://images.unsplash.com/photo-1611251135345-18c56206b863?w=900&q=80',
}
const FALLBACK = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=900&q=80'
function getSportImage(sport) {
  return SPORT_IMAGES[sport?.toLowerCase().trim()] || FALLBACK
}

const countBy = (events, key, value) => events.filter((e) => e[key] === value).length

export default function Home() {
  const { data: events, error, reload } = useAsync(({ force }) => getUpcomingEvents({ force }))
  const { data: carouselEvents } = useAsync(({ force }) => getLatestUpcomingEvents({ limit: 15, force }))

  const featured = events?.[0] ?? null
  const rest = events?.slice(1, 6) ?? []

  return (
    <>
      <Hero />

      {/* ── Featured Events ── */}
      <section className="bg-white py-20" aria-labelledby="featured">
        <div className="container-page">
          <SectionHeading
            title="Featured Events"
            subtitle="Handpicked upcoming events from across India."
            linkTo="/events"
            linkLabel="View all events"
          />

          {error && <ErrorState onRetry={reload} />}

          {/* Skeleton */}
          {!events && !error && (
            <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <div className="h-96 animate-pulse bg-gray-100" />
              <div className="grid gap-5">
                <div className="h-44 animate-pulse bg-gray-100" />
                <div className="h-44 animate-pulse bg-gray-100" />
              </div>
            </div>
          )}

          {events && featured && (
            <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              {/* Large featured card */}
              <Link
                to={`/events/${featured.id}`}
                className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden"
              >
                <div className="card-img-wrap absolute inset-0">
                  <div
                    className="card-img-bg h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${getSportImage(featured.sport)}')` }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative p-8">
                  <span className="bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {featured.sport}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
                    {featured.event_name}
                  </h3>
                  <p className="mt-2 text-white/70">{featured.city}, {featured.state} · {featured.start_date}</p>
                  <span className="mt-4 inline-block bg-white px-5 py-2.5 text-sm font-bold text-charcoal transition group-hover:bg-red-600 group-hover:text-white">
                    View Event →
                  </span>
                </div>
              </Link>

              {/* Side cards */}
              <div className="grid gap-5">
                {rest.slice(0, 2).map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="group relative flex min-h-[11rem] flex-col justify-end overflow-hidden transition hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${getSportImage(e.sport)}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="relative p-5">
                      <span className="bg-red-600 px-2 py-0.5 text-xs font-bold uppercase text-white">{e.sport}</span>
                      <h3 className="mt-2 font-display text-lg font-bold text-white line-clamp-2">{e.event_name}</h3>
                      <p className="mt-1 text-sm text-white/70">{e.city} · {e.start_date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Upcoming Events Carousel ── */}
      <section className="bg-offwhite py-20" aria-labelledby="upcoming">
        <div className="container-page">
          <SectionHeading
            title="Upcoming Events"
            subtitle="Discover upcoming sports events across India."
            linkTo="/events"
            linkLabel="View all events"
          />
          {/* skeleton */}
          {!events && !error && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => <div key={i} className="h-72 animate-pulse bg-gray-200" />)}
            </div>
          )}
          {carouselEvents && carouselEvents.length > 0 && <EventCarousel events={carouselEvents} />}
        </div>
      </section>

      {/* ── Sports Categories ── */}
      <section className="bg-white py-20" aria-labelledby="sports">
        <div className="container-page">
          <SectionHeading
            title="Browse by Sport"
            subtitle="Pick a sport and see what's coming up."
            linkTo="/sports"
            linkLabel="All sports"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {SPORTS.filter((s) => s.home).map((s) => (
              <SportCard key={s.name} sport={s} count={events ? countBy(events, 'sport', s.name) : 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities ── */}
      <section className="bg-charcoal py-20" aria-labelledby="cities" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="container-page">
          <SectionHeading
            title="Events Across India"
            subtitle="See what's happening near you."
            linkTo="/cities"
            linkLabel="All cities"
            light
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c) => (
              <CityCard key={c.name} city={c} count={events ? countBy(events, 'city', c.name) : 0} cta />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsor CTA ── */}
      <section className="bg-red-600 py-20">
        <div className="container-page flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/70">Partnership Opportunities</p>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl">
              Partner with<br />Arena India
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Connect your brand with India's growing sports ecosystem. Reach passionate fans across every sport and city.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              to="/events"
              className="border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-red-600"
            >
              Become a Sponsor
            </Link>
            <Link
              to="/events"
              className="bg-white px-8 py-4 text-base font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-700 hover:text-white"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
