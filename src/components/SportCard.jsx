import { Link } from 'react-router-dom'
import SportIcon from './SportIcon.jsx'
import { sportEventsUrl } from '../utils/sports.js'
import { DEFAULT_SPORT } from '../data/sports.js'

// `meta` overrides the count line; `cta` adds an "Explore Events" action (used on /sports).
export default function SportCard({ sport, count, meta, cta = false }) {
  const [from, to] = sport.colors
  const line = meta ?? (count > 0 ? `${count} upcoming` : 'Coming soon')
  return (
    <Link
      to={sportEventsUrl(sport.name)}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 ${cta ? 'min-h-[11.5rem]' : 'aspect-[4/3]'}`}
      style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
    >
      <SportIcon
        path={sport.icon || DEFAULT_SPORT.icon}
        size={88}
        strokeWidth={1.2}
        className="pointer-events-none absolute right-3 top-3 text-white/30 transition duration-500 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:text-white/45"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <span className="relative font-display text-2xl font-extrabold text-white">{sport.name}</span>
      <span className="relative text-sm text-white/85">{line}</span>
      {cta && <span className="relative mt-3 text-sm font-bold text-white underline-offset-4 group-hover:underline">Explore Events</span>}
    </Link>
  )
}
