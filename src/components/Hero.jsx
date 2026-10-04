import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'

// Court/pitch line-work: concentric arcs and a centre line, a nod to every playing surface.
function PitchLines() {
  return (
    <svg className="pointer-events-none absolute -right-40 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 text-accent opacity-[0.16] sm:-right-24 lg:right-0" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="200" cy="200" r="60" /><circle cx="200" cy="200" r="120" /><circle cx="200" cy="200" r="180" />
      <path d="M200 10v380M10 200h380" strokeDasharray="4 8" />
      <path d="M20 120a190 190 0 0 1 0 160M380 120a190 190 0 0 0 0 160" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <PitchLines />
      <div className="container-page relative py-20 sm:py-28 lg:py-36">
        <h1 className="rise max-w-4xl text-5xl font-extrabold leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
          Every Game.<br />Every City.<br />One Destination.
        </h1>
        <p className="rise mt-7 max-w-xl text-lg text-slate-300 sm:text-xl" style={{ animationDelay: '120ms' }}>
          Discover upcoming sports events across India, from city leagues and marathons to national championships. Find where they are and how to take part.
        </p>
        <div className="rise mt-9" style={{ animationDelay: '240ms' }}>
          <SearchBar />
        </div>
        <div className="rise mt-6 flex flex-wrap gap-3" style={{ animationDelay: '360ms' }}>
          <Link to="/events" className="btn-primary px-7 py-3.5 text-base">Explore Events</Link>
          <Link to="/sports" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-base font-bold text-white transition hover:border-white/50 hover:bg-white/5">
            Browse Sports
          </Link>
        </div>
      </div>
    </section>
  )
}
