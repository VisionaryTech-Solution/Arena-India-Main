import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { BRAND, NAV_LINKS } from '../data/navigation.js'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-navy-900/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 font-display text-xl font-bold leading-snug text-white">{BRAND.tagline}</p>
          <p className="mt-3 text-sm text-slate-400">
            Discover India&rsquo;s sporting calendar and find your next live experience.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-display text-base font-bold text-white">Browse</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-slate-400 transition hover:text-accent">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. Early preview.</p>
          <p>Event information may be incomplete. Always confirm details with the organiser.</p>
        </div>
      </div>
    </footer>
  )
}
