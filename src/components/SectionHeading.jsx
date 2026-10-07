import { Link } from 'react-router-dom'

export default function SectionHeading({ title, subtitle, linkTo, linkLabel, light = false }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="mb-3 h-1 w-12 bg-red-600" />
        <h2 className={`font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-charcoal'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-2 max-w-xl text-base ${light ? 'text-white/60' : 'text-gray-500'}`}>{subtitle}</p>
        )}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className={`text-sm font-bold uppercase tracking-wide transition ${light ? 'text-white hover:text-red-400' : 'text-red-600 hover:text-red-700'}`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}
