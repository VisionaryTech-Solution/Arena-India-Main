import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { SPORTS } from '../data/sports.js'

const NAV = [
  { label: 'Events', to: '/events' },
  { label: 'Sports', to: '/sports', hasMega: true },
  { label: 'Cities', to: '/cities' },
]

function SportsDropdown({ onClose }) {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-0 w-[640px] -translate-x-1/2 border border-gray-200 bg-white shadow-2xl">
      <div className="p-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-red-600">Browse by Sport</p>
        <div className="grid grid-cols-3 gap-2">
          {SPORTS.map((s) => (
            <Link
              key={s.name}
              to={`/events?sport=${encodeURIComponent(s.name)}`}
              onClick={onClose}
              className="flex items-center gap-2.5 border border-gray-100 px-3 py-2.5 text-sm font-medium text-charcoal transition hover:border-red-600 hover:text-red-600"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={s.icon} />
              </svg>
              {s.name}
            </Link>
          ))}
          <Link
            to="/sports"
            onClick={onClose}
            className="flex items-center gap-2 border border-dashed border-gray-300 px-3 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-600"
          >
            All Sports →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const { pathname } = useLocation()
  const megaRef = useRef(null)

  useEffect(() => { setMobileOpen(false); setMegaOpen(false) }, [pathname])

  useEffect(() => {
    if (!megaOpen) return
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [megaOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((l) =>
            l.hasMega ? (
              <div key={l.label} className="relative" ref={megaRef}>
                <button
                  type="button"
                  onClick={() => setMegaOpen((o) => !o)}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition ${megaOpen ? 'text-red-600' : 'text-charcoal hover:text-red-600'}`}
                >
                  {l.label}
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}>
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </button>
                {megaOpen && <SportsDropdown onClose={() => setMegaOpen(false)} />}
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold transition ${isActive ? 'text-red-600' : 'text-charcoal hover:text-red-600'}`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/sponsor"
            className="bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Become a Sponsor
          </Link>
          <Link
            to="/vendor-categories"
            className="border-2 border-charcoal px-5 py-2.5 text-sm font-bold text-charcoal transition hover:bg-charcoal hover:text-white"
          >
            Become a Vendor
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-gray-200 text-charcoal md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <path d="M4 4l12 12M16 4 4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <nav className="min-h-0 overflow-hidden border-t border-gray-100" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-3 text-base font-semibold ${isActive ? 'text-red-600' : 'text-charcoal'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/sponsor" className="mt-3 bg-red-600 px-5 py-3 text-center text-base font-bold text-white">
              Become a Sponsor
            </Link>
            <Link to="/vendor-categories" className="mt-2 border-2 border-charcoal px-5 py-3 text-center text-base font-bold text-charcoal transition hover:bg-charcoal hover:text-white">
              Become a Vendor
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
