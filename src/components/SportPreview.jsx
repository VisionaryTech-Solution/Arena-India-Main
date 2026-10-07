import { Link } from 'react-router-dom'
import EventCard from './EventCard.jsx'
import SportIcon from './SportIcon.jsx'
import { sportEventsUrl } from '../utils/sports.js'

export default function SportPreview({ sport, limit = 2 }) {
  const n = sport.upcoming.length
  const [from, to] = sport.colors
  return (
    <div className="border border-gray-200 bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center text-white" style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}>
            <SportIcon path={sport.icon} size={26} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-extrabold uppercase text-charcoal">{sport.name}</h3>
            <p className="text-sm text-gray-500">{n === 0 ? 'No upcoming events' : `${n} upcoming ${n === 1 ? 'event' : 'events'}`}</p>
          </div>
        </div>
        {n > 0 && (
          <Link to={sportEventsUrl(sport.name)} className="text-sm font-bold text-red-600 hover:text-red-700">
            View all {sport.name} events →
          </Link>
        )}
      </div>

      {n > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {sport.upcoming.slice(0, limit).map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-gray-200 px-6 py-10 text-center">
          <p className="font-bold text-charcoal">No upcoming events found for this sport.</p>
          <Link to="/events" className="mt-5 inline-block bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700">
            Explore all events
          </Link>
        </div>
      )}
    </div>
  )
}
