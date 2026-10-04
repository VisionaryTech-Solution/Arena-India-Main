import { Link } from 'react-router-dom'
import SportIcon from './SportIcon.jsx'
import { PIN_ICON, cityEventsUrl, cityTone } from '../utils/cities.js'

// Compact row on the homepage. With `cta` it becomes the larger card used on /cities.
export default function CityCard({ city, count, cta = false }) {
  if (cta) {
    return (
      <Link
        to={cityEventsUrl(city.name)}
        className="group relative flex min-h-[11.5rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl hover:shadow-black/40"
        style={{ background: `linear-gradient(150deg, ${cityTone(city.name)}66, #0A1128 72%)` }}
      >
        <SportIcon path={PIN_ICON} size={72} strokeWidth={1.2} className="pointer-events-none absolute right-4 top-4 text-white/25 transition duration-500 group-hover:-translate-y-0.5 group-hover:text-white/40" />
        <span className="relative font-display text-2xl font-extrabold text-white">{city.name}</span>
        <span className="relative text-sm text-slate-300">{city.state}</span>
        <span className="relative mt-3 flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-white">{count} {count === 1 ? 'event' : 'events'}</span>
          <span className="font-bold text-accent group-hover:underline underline-offset-4">Explore Events</span>
        </span>
      </Link>
    )
  }
  return (
    <Link
      to={cityEventsUrl(city.name)}
      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-navy-900 p-5 transition duration-300 hover:border-accent/50 hover:bg-navy-800"
    >
      <span>
        <span className="block font-display text-xl font-bold text-white">{city.name}</span>
        <span className="text-sm text-slate-400">{city.state}</span>
      </span>
      <span className="text-right text-sm">
        <span className="block font-display text-2xl font-extrabold text-accent transition group-hover:scale-110">{count}</span>
        <span className="text-slate-500">{count === 1 ? 'event' : 'events'}</span>
      </span>
    </Link>
  )
}
