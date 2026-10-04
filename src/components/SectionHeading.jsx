import { Link } from 'react-router-dom'

export default function SectionHeading({ title, subtitle, linkTo, linkLabel }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-xl text-slate-400">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="text-sm font-bold text-accent hover:text-accent-soft">{linkLabel}</Link>
      )}
    </div>
  )
}
