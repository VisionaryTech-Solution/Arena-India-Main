import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import EventCard from '../components/EventCard.jsx'
import SportCard from '../components/SportCard.jsx'
import CityCard from '../components/CityCard.jsx'
import { getUpcomingEvents } from '../services/eventsApi.js'
import ErrorState from '../components/ErrorState.jsx'
import { useAsync } from '../hooks/useAsync.js'
import { SPORTS } from '../data/sports.js'
import { CITIES } from '../data/cities.js'

const countBy = (events, key, value) => events.filter((e) => e[key] === value).length

export default function Home() {
  const { data: events, error, reload } = useAsync(({ force }) => getUpcomingEvents({ force }))

  return (
    <>
      <Hero />

      <section className="container-page pt-20" aria-labelledby="upcoming">
        <SectionHeading
          title="Upcoming Events"
          subtitle="The next events on India's sporting calendar. Sample listings shown for now."
          linkTo="/events"
          linkLabel="View all events"
        />
        {error && <ErrorState onRetry={reload} />}
        {!events && !error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-60 animate-pulse rounded-2xl bg-navy-900" />)}
          </div>
        )}
        {events && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        )}
      </section>

      <section className="container-page pt-24" aria-labelledby="sports">
        <SectionHeading title="Explore Sports" subtitle="Pick a sport and see what's coming up." linkTo="/sports" linkLabel="All sports" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SPORTS.filter((s) => s.home).map((s) => <SportCard key={s.name} sport={s} count={events ? countBy(events, 'sport', s.name) : 0} />)}
        </div>
      </section>

      <section className="container-page pt-24" aria-labelledby="cities">
        <SectionHeading title="Explore by City" subtitle="See what's happening near you." linkTo="/cities" linkLabel="All cities" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((c) => <CityCard key={c.name} city={c} count={events ? countBy(events, 'city', c.name) : 0} />)}
        </div>
      </section>

      <section className="container-page pt-24">
        <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-14 text-navy-950 sm:px-14 sm:py-20">
          <svg className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 text-navy-950 opacity-10" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="6" aria-hidden="true">
            <circle cx="200" cy="200" r="60" /><circle cx="200" cy="200" r="120" /><circle cx="200" cy="200" r="180" />
          </svg>
          <h2 className="relative max-w-2xl text-4xl font-extrabold !text-navy-950 sm:text-6xl">Your next game is already on the calendar.</h2>
          <p className="relative mt-5 max-w-lg text-lg text-navy-900/80">Browse upcoming events, check the venue and head straight to the organiser to register.</p>
          <Link to="/events" className="relative mt-8 inline-flex rounded-full bg-navy-950 px-8 py-4 text-base font-bold text-white transition hover:bg-navy-800">
            Explore Events
          </Link>
        </div>
      </section>
    </>
  )
}
