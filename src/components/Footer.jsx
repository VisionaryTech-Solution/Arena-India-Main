import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { BRAND } from '../data/navigation.js'

const FOOTER_LINKS = {
  Discover: [
    { label: 'Events', to: '/events' },
    { label: 'Sports', to: '/sports' },
    { label: 'Cities', to: '/cities' },
  ],
  Company: [
    { label: 'About Arena India', to: '/' },
    { label: 'Become a Sponsor', to: '/events' },
    { label: 'Contact Us', to: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-white" style={{ backgroundColor: '#111111' }}>
      {/* Top sponsor strip */}
      <div className="border-b border-white/10 bg-red-600">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div>
            <p className="font-display text-xl font-extrabold uppercase text-white">Partner with Arena India</p>
            <p className="text-sm text-white/80">Connect your brand with India's growing sports ecosystem.</p>
          </div>
          <Link
            to="/events"
            className="shrink-0 border-2 border-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-red-600"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        {/* Brand */}
        <div className="max-w-sm">
          <Logo dark />
          <p className="mt-4 font-display text-lg font-bold leading-snug text-white">{BRAND.tagline}</p>
          <p className="mt-3 text-sm text-white/50">
            Discover India's sporting calendar and find your next live experience — from grassroots leagues to national championships.
          </p>
          {/* Social */}
          <div className="mt-6 flex gap-3">
            {[
              { label: 'Twitter', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
              { label: 'Instagram', path: 'M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm4.5-9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z' },
              { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58ZM10 15V9l5.2 3L10 15Z' },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="grid h-9 w-9 place-items-center border border-white/20 text-white/60 transition hover:border-red-600 hover:text-red-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <nav key={group} aria-label={group}>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-red-500">{group}</h3>
            <ul className="space-y-3 text-sm">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 transition hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-white/30 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Event information may be incomplete. Always confirm details with the organiser.</p>
        </div>
      </div>
    </footer>
  )
}
