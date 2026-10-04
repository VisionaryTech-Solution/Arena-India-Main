import { Link } from 'react-router-dom'
import { BRAND } from '../data/navigation.js'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${BRAND.name} home`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#FF7A1A" />
        <path d="M8 24 16 7l8 17h-4.2L16 15.6 12.2 24z" fill="#0A1128" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">{BRAND.name}</span>
    </Link>
  )
}
