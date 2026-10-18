import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

const SPONSOR_TIERS = [
  {
    tier: 'Title Sponsor',
    description: 'Maximum brand visibility across all Arena India events, digital platforms, and media coverage.',
    perks: ['Logo on all event materials', 'Dedicated social media campaigns', 'VIP hospitality at all events', 'Exclusive naming rights'],
  },
  {
    tier: 'Gold Sponsor',
    description: 'High-impact presence at major events with strong digital and on-ground exposure.',
    perks: ['Logo on event banners & jerseys', 'Social media mentions', 'VIP access at select events', 'Brand activation opportunities'],
  },
  {
    tier: 'Silver Sponsor',
    description: 'Targeted visibility at regional events with growing sports audiences.',
    perks: ['Logo on event collateral', 'Website listing', 'Event day presence', 'Community engagement'],
  },
  {
    tier: 'Associate Sponsor',
    description: "Entry-level partnership to connect your brand with India's sports community.",
    perks: ['Website logo listing', 'Social media tag', 'Event day mention', 'Newsletter feature'],
  },
]

const STATS = [
  ['50+', 'Cities Covered'],
  ['100+', 'Events Annually'],
  ['12+', 'Sports Disciplines'],
  ['500K+', 'Sports Fans Reached'],
]

export default function Sponsor() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal py-24 sm:py-32" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />
        <div className="container-page">
          <p className="section-label mb-4 text-red-400">Partnership Opportunities</p>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-tight text-white sm:text-7xl">
            Partner with<br />
            <span className="text-red-500">Arena India</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Connect your brand with India's fastest-growing sports ecosystem. Reach passionate fans across every sport, every city, every event.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:partnerships@arenaindia.in"
              className="bg-red-600 px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-red-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white py-12">
        <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-extrabold text-red-600">{num}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="bg-offwhite py-20">
        <div className="container-page">
          <SectionHeading
            title="Sponsorship Tiers"
            subtitle="Choose the partnership level that fits your brand goals."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPONSOR_TIERS.map((s, i) => (
              <div
                key={s.tier}
                className={`flex flex-col border p-6 transition hover:shadow-lg ${i === 0 ? 'border-red-600 bg-white' : 'border-gray-200 bg-white'}`}
              >
                {i === 0 && (
                  <span className="mb-3 inline-block bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-extrabold uppercase text-charcoal">{s.tier}</h3>
                <p className="mt-2 text-sm text-gray-500">{s.description}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {s.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-charcoal">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-red-600" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:partnerships@arenaindia.in"
                  className="mt-6 border-2 border-charcoal px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-white"
                >
                  Get in Touch
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="bg-red-600 py-20">
        <div className="container-page flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/70">Vendor Opportunities</p>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl">
              Become a Vendor<br />at Arena India Events
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Offer your services — from ICT and branding to security and housekeeping — at India's premier sports events.
            </p>
          </div>
          <Link
            to="/vendor-categories"
            className="shrink-0 border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-red-600"
          >
            Become a Vendor →
          </Link>
        </div>
      </section>
    </>
  )
}
