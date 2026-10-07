import { Link } from 'react-router-dom'
import { cityEventsUrl, cityTone } from '../utils/cities.js'

const CITY_IMAGES = {
  Mumbai: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&q=70',
  Delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=70',
  Bengaluru: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=500&q=70',
  Kolkata: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=500&q=70',
  Hyderabad: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=500&q=70',
  Chennai: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=70',
  Pune: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=500&q=70',
  Ahmedabad: 'https://images.unsplash.com/photo-1599030236641-e4e8e7c5e9e5?w=500&q=70',
  Jaipur: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=70',
  Ranchi: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=70',
  Jamshedpur: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=70',
}

export default function CityCard({ city, count, cta = false }) {
  const imgSrc = CITY_IMAGES[city.name]
  const tone = cityTone(city.name)

  if (cta) {
    return (
      <Link
        to={cityEventsUrl(city.name)}
        className="group relative flex min-h-[11.5rem] flex-col justify-end overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="card-img-wrap absolute inset-0">
          {imgSrc ? (
            <img src={imgSrc} alt={city.name} className="card-img-bg h-full w-full object-cover" />
          ) : (
            <div className="card-img-bg h-full w-full" style={{ background: `linear-gradient(150deg, ${tone}99, #1A1A1A 72%)` }} />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative p-5">
          <span className="block font-display text-2xl font-extrabold uppercase text-white">{city.name}</span>
          <span className="block text-sm text-white/70">{city.state}</span>
          <span className="mt-3 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-white">{count} {count === 1 ? 'event' : 'events'}</span>
            <span className="font-bold text-red-400 transition group-hover:text-white">Explore →</span>
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={cityEventsUrl(city.name)}
      className="group flex items-center justify-between border border-gray-200 bg-white p-5 transition duration-300 hover:border-red-600 hover:shadow-md"
    >
      <span>
        <span className="block font-display text-xl font-bold text-charcoal">{city.name}</span>
        <span className="text-sm text-gray-500">{city.state}</span>
      </span>
      <span className="text-right text-sm">
        <span className="block font-display text-2xl font-extrabold text-red-600 transition group-hover:scale-110">{count}</span>
        <span className="text-gray-400">{count === 1 ? 'event' : 'events'}</span>
      </span>
    </Link>
  )
}
