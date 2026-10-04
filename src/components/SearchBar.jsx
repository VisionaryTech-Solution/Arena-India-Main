import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ placeholder = 'Search sports, events or cities...' }) {
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
      className="flex w-full max-w-2xl items-center gap-2 rounded-full border border-white/15 bg-navy-900/80 p-2 pl-5 shadow-2xl shadow-black/30 backdrop-blur transition focus-within:border-accent/70"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8A97C0" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
        <circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" />
      </svg>
      <label htmlFor="hero-search" className="sr-only">Search events</label>
      <input
        id="hero-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent py-3 text-base text-white placeholder:text-slate-500 focus:outline-none sm:text-lg"
      />
      <button type="submit" className="btn-primary shrink-0 px-6 py-3 text-base">Search</button>
    </form>
  )
}
