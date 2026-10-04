import { Link } from 'react-router-dom'
import EventCard from './EventCard.jsx'
import SportIcon from './SportIcon.jsx'
import { PIN_ICON, cityEventsUrl, cityTone } from '../utils/cities.js'

export default function CityPreview({ city, limit = 2 }) {
  const n = city.upcoming.length
  const tone = cityTone(city.name)
  return (
    <div className="rounded-3xl border border-white/10 bg-navy-900/60 p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white" style={{ background: `linear-gradient(145deg, ${tone}, #0A1128)` }}>
            <SportIcon path={PIN_ICON} size={26} />
          </span>
          <div>
            <h3 className="text-2xl font-extrabold">{city.name}</h3>
            <p className="text-sm text-slate-400">
              {city.state}. {n === 0 ? 'No upcoming events' : `${n} upcoming ${n === 1 ? 'event' : 'events'}`}
            </p>
          </div>
        </div>
        {n > 0 && (
          <Link to={cityEventsUrl(city.name)} className="text-sm font-bold text-accent hover:text-accent-soft">
            View all {city.name} events &rarr;
          </Link>
        )}
      </div>

      {n > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {city.upcoming.slice(0, limit).map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center">
          <p className="font-bold text-white">No upcoming events found in this city.</p>
          <Link to="/events" className="btn-primary mt-5 px-6 py-3">Explore all events</Link>
        </div>
      )}
    </div>
  )
}
