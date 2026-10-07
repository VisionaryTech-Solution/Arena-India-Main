import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ placeholder = 'Search sports, events or cities...', dark = false }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const term = q.trim()
    navigate(term ? `/events?q=${encodeURIComponent(term)}` : '/events')
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      className={`flex w-full items-center gap-2 border-2 p-2 pl-5 shadow-xl transition focus-within:border-red-600 ${
        dark
          ? 'border-white/30 bg-white/10 backdrop-blur'
          : 'border-gray-200 bg-white'
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={dark ? '#ffffff99' : '#999'} strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
        <circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" />
      </svg>
      <label htmlFor="hero-search" className="sr-only">Search events</label>
      <input
        id="hero-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent py-3 text-base focus:outline-none sm:text-lg ${
          dark ? 'text-white placeholder:text-white/50' : 'text-charcoal placeholder:text-gray-400'
        }`}
      />
      <button type="submit" className="shrink-0 bg-red-600 px-6 py-3 text-base font-bold text-white transition hover:bg-red-700">
        Search
      </button>
    </form>
  )
}
