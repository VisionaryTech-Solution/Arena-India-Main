import { Link } from 'react-router-dom'
import { formatDateRange } from '../utils/date.js'

const STATUS_STYLE = {
  Upcoming: 'bg-sky-100 text-sky-700',
  'Registration Open': 'bg-emerald-100 text-emerald-700',
  Live: 'bg-red-100 text-red-700',
  Completed: 'bg-gray-100 text-gray-500',
}

// Sport-themed gradient backgrounds for cards without images
const SPORT_COLORS = {
  Cricket: 'from-blue-900 to-blue-700',
  Football: 'from-green-900 to-green-700',
  Kabaddi: 'from-orange-900 to-orange-700',
  Badminton: 'from-purple-900 to-purple-700',
  Hockey: 'from-teal-900 to-teal-700',
  Athletics: 'from-rose-900 to-rose-700',
  Running: 'from-amber-900 to-amber-700',
  Tennis: 'from-lime-900 to-lime-700',
  Basketball: 'from-orange-900 to-red-800',
  Volleyball: 'from-cyan-900 to-blue-800',
  Swimming: 'from-indigo-900 to-blue-700',
  Boxing: 'from-red-900 to-red-700',
}

const SPORT_IMAGES = {
  cricket:      '/sports/cricket.jpg',
  football:     '/sports/football.jpg',
  basketball:   '/sports/basketball.jpg',
  volleyball:   '/sports/volleyball.jpg',
  tennis:       '/sports/tennis.jpg',
  badminton:    '/sports/badminton.jpg',
  hockey:       '/sports/hockey.jpg',
  kabaddi:      '/sports/kabaddi.jpg',
  running:      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=70',
  athletics:    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=70',
  swimming:     'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=70',
  boxing:       'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=70',
  gymnastics:   'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=600&q=70',
  'table tennis': 'https://images.unsplash.com/photo-1611251135345-18c56206b863?w=600&q=70',
}

export default function EventCard({ event }) {
  const e = event
  const imgSrc = SPORT_IMAGES[e.sport?.toLowerCase().trim()]
  const gradient = SPORT_COLORS[e.sport] || 'from-gray-900 to-gray-700'

  return (
    <article className="group relative flex flex-col overflow-hidden border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="card-img-wrap relative h-48 overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={e.sport} className="card-img-bg h-full w-full object-cover" />
        ) : (
          <div className={`card-img-bg h-full w-full bg-gradient-to-br ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Sport badge on image */}
        <span className="absolute bottom-3 left-3 bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
          {e.sport}
        </span>
        {/* Status badge */}
        <span className={`absolute right-3 top-3 px-2.5 py-1 text-xs font-bold ${STATUS_STYLE[e.event_status] || STATUS_STYLE.Upcoming}`}>
          {e.event_status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-charcoal line-clamp-2">{e.event_name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">{e.event_category}</p>

        <dl className="mt-4 space-y-1.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" /></svg>
            <dd className="font-medium text-charcoal">{formatDateRange(e.start_date, e.end_date)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></svg>
            <dd>{e.city}, {e.state}</dd>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12M9 21v-6h6v6" /></svg>
            <dd className="truncate text-gray-400">{e.venue}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Link
            to={`/events/${e.id}`}
            className="relative bg-charcoal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 after:absolute after:inset-0 after:content-['']"
            aria-label={`View event: ${e.event_name}`}
          >
            View Event →
          </Link>
          {e.is_demo && <span className="text-xs text-gray-400">Demo</span>}
        </div>
      </div>
    </article>
  )
}
