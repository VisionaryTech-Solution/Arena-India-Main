import { Link } from 'react-router-dom'
import SportIcon from './SportIcon.jsx'
import { sportEventsUrl } from '../utils/sports.js'
import { DEFAULT_SPORT } from '../data/sports.js'

const SPORT_IMAGES = {
  cricket:        '/sports/cricket.jpg',
  football:       '/sports/football.jpg',
  basketball:     '/sports/basketball.jpg',
  volleyball:     '/sports/volleyball.jpg',
  tennis:         '/sports/tennis.jpg',
  badminton:      '/sports/badminton.jpg',
  hockey:         '/sports/hockey.jpg',
  kabaddi:        '/sports/kabaddi.jpg',
  running:        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=70',
  athletics:      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=70',
  swimming:       'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&q=70',
  boxing:         'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=70',
  'table tennis': 'https://images.unsplash.com/photo-1611251135345-18c56206b863?w=500&q=70',
}

export default function SportCard({ sport, count, meta, cta = false }) {
  const imgSrc = SPORT_IMAGES[sport.name?.toLowerCase().trim()]
  const [from, to] = sport.colors
  const line = meta ?? (count > 0 ? `${count} upcoming` : 'Coming soon')

  return (
    <Link
      to={sportEventsUrl(sport.name)}
      className={`group relative flex flex-col justify-end overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${cta ? 'min-h-[11.5rem]' : 'aspect-[4/3]'}`}
    >
      {/* Background */}
      <div className="card-img-wrap absolute inset-0">
        {imgSrc ? (
          <img src={imgSrc} alt={sport.name} className="card-img-bg h-full w-full object-cover" />
        ) : (
          <div className="card-img-bg h-full w-full" style={{ background: `linear-gradient(145deg, ${from}, ${to})` }} />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Icon */}
      <SportIcon
        path={sport.icon || DEFAULT_SPORT.icon}
        size={72}
        strokeWidth={1.2}
        className="pointer-events-none absolute right-3 top-3 text-white/30 transition duration-500 group-hover:text-white/50"
      />

      {/* Content */}
      <div className="relative p-4">
        <span className="block font-display text-xl font-extrabold uppercase text-white">{sport.name}</span>
        <span className="block text-sm text-white/75">{line}</span>
        {cta && (
          <span className="mt-2 block text-xs font-bold uppercase tracking-wide text-red-400 transition group-hover:text-white">
            Explore Events →
          </span>
        )}
      </div>
    </Link>
  )
}
