import { Link } from 'react-router-dom'
import { BRAND } from '../data/navigation.js'

export default function Logo({ dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${BRAND.name} home`}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" fill="#CC0000" />
        <path d="M8 24 16 7l8 17h-4.2L16 15.6 12.2 24z" fill="#FFFFFF" />
      </svg>
      <span className={`font-display text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-charcoal'}`}>
        {BRAND.name}
      </span>
    </Link>
  )
}
