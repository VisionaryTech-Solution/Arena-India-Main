import SearchBar from './SearchBar.jsx'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Background image */}
      <div className="card-img-wrap absolute inset-0">
        <div
          className="card-img-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/sports/Ground.jpg')`,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Red accent bar */}
      <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

      <div className="container-page relative flex min-h-[92vh] flex-col justify-center py-24">
        {/* Label */}
        <p className="rise section-label mb-6 text-red-400">India's Premier Sports Events Platform</p>

        {/* Main heading */}
        <h1 className="rise max-w-5xl font-display text-6xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-8xl lg:text-[7rem]" style={{ animationDelay: '80ms' }}>
          Own The<br />
          <span className="text-red-500">Experience</span>
        </h1>

        {/* Subtext */}
        <p className="rise mt-8 max-w-xl text-lg text-white/80 sm:text-xl" style={{ animationDelay: '180ms' }}>
          Discover upcoming sports events across India — from city leagues and marathons to national championships. Find where they are and how to take part.
        </p>

        {/* Search */}
        <div className="rise mt-10 w-full max-w-2xl" style={{ animationDelay: '280ms' }}>
          <SearchBar dark />
        </div>

        {/* CTAs */}
        <div className="rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: '360ms' }}>
          <Link to="/events" className="bg-red-600 px-8 py-4 text-base font-bold text-white transition hover:bg-red-700">
            Explore Events
          </Link>
          <Link to="/sports" className="border-2 border-white px-8 py-4 text-base font-bold text-white transition hover:bg-white hover:text-charcoal">
            Browse Sports
          </Link>
        </div>

        {/* Stats strip */}
        <div className="rise mt-16 flex flex-wrap gap-8 border-t border-white/20 pt-8" style={{ animationDelay: '440ms' }}>
          {[['12+', 'Sports'], ['50+', 'Cities'], ['100+', 'Events'], ['All India', 'Coverage']].map(([num, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold text-white">{num}</p>
              <p className="text-sm text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
