import { Link } from 'react-router-dom'
import { formatDateRange } from '../utils/date.js'

const STATUS_STYLE = {
  Upcoming: 'bg-sky-400/15 text-sky-300',
  'Registration Open': 'bg-emerald-400/15 text-emerald-300',
  Live: 'bg-red-500/20 text-red-300',
  Completed: 'bg-slate-500/20 text-slate-400',
}
const VERIFY_STYLE = {
  Verified: 'text-emerald-300',
  Pending: 'text-amber-300',
  Unverified: 'text-slate-400',
}

export default function EventCard({ event }) {
  const e = event
  return (
    <article className="group relative flex flex-col rounded-2xl border border-white/10 bg-navy-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-navy-800">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-soft">{e.sport}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[e.event_status] || STATUS_STYLE.Upcoming}`}>
          {e.event_status}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-bold leading-snug">{e.event_name}</h3>
      <p className="mt-1 text-sm text-slate-400">{e.event_category}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div><dt className="sr-only">Dates</dt><dd className="font-medium text-white">{formatDateRange(e.start_date, e.end_date)}</dd></div>
        <div><dt className="sr-only">Location</dt><dd>{e.city}, {e.state}</dd></div>
        <div><dt className="sr-only">Venue</dt><dd className="text-slate-400">{e.venue}</dd></div>
      </dl>
      <p className="mt-4 text-xs">
        <span className="text-slate-500">Verification: </span>
        <span className={`font-bold ${VERIFY_STYLE[e.verification_status] || VERIFY_STYLE.Unverified}`}>{e.verification_status}</span>
      </p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <Link
          to={`/events/${e.id}`}
          className="btn-primary after:absolute after:inset-0 after:content-['']"
          aria-label={`View event: ${e.event_name}`}
        >
          View Event
        </Link>
        {e.is_demo && <span className="text-xs text-slate-500">Demo data</span>}
      </div>
    </article>
  )
}
