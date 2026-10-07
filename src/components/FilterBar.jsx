import { useEffect, useState } from 'react'
import { DATE_PRESETS } from '../utils/filters.js'

const field = 'w-full border bg-white px-3 text-charcoal transition focus:border-red-600 focus:outline-none'

function Select({ label, value, onChange, options, anyLabel, big }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-gray-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} ${big ? 'py-3 text-base' : 'py-2.5 text-sm'} ${value ? 'border-red-500' : 'border-gray-200 text-gray-600'}`}
      >
        <option value="">{anyLabel}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </label>
  )
}

function Fields({ filters, options, onChange, big }) {
  return (
    <>
      <Select big={big} label="Sport" anyLabel="All sports" value={filters.sport} options={options.sports} onChange={(v) => onChange('sport', v)} />
      <Select big={big} label="State" anyLabel="All states" value={filters.state} options={options.states} onChange={(v) => onChange('state', v)} />
      <Select big={big} label="City" anyLabel="All cities" value={filters.city} options={options.cities} onChange={(v) => onChange('city', v)} />
      <Select big={big} label="Category" anyLabel="All categories" value={filters.category} options={options.categories} onChange={(v) => onChange('category', v)} />
      <Select big={big} label="Status" anyLabel="Any status" value={filters.status} options={options.statuses} onChange={(v) => onChange('status', v)} />
      <Select big={big} label="Date" anyLabel="All dates" value={filters.date} options={DATE_PRESETS} onChange={(v) => onChange('date', v)} />
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-slate-400">Specific date</span>
        <input
          type="date"
          value={filters.on}
          onChange={(e) => onChange('on', e.target.value)}
          className={`${field} ${big ? 'py-3 text-base' : 'py-2.5 text-sm'} ${filters.on ? 'border-accent/60' : 'border-white/10'}`}
        />
      </label>
    </>
  )
}

export default function FilterBar({ filters, options, onChange, onClear, activeCount, resultCount }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const clearBtn = 'border border-gray-200 px-4 py-2.5 text-sm font-bold text-charcoal transition hover:border-red-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div>
      {/* Mobile trigger */}
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex min-h-11 items-center gap-2 border border-gray-200 bg-white px-5 text-sm font-bold text-charcoal"
        >
          Filters
          {activeCount > 0 && <span className="grid h-5 min-w-5 place-items-center bg-red-600 px-1 text-xs text-white">{activeCount}</span>}
        </button>
        {activeCount > 0 && <button type="button" onClick={onClear} className="min-h-11 px-2 text-sm font-bold text-red-600">Clear Filters</button>}
      </div>

      {/* Desktop panel */}
      <div className="hidden grid-cols-4 items-end gap-3 border border-gray-200 bg-white p-5 lg:grid">
        <Fields filters={filters} options={options} onChange={onChange} />
        <button type="button" onClick={onClear} disabled={activeCount === 0} className={clearBtn}>Clear Filters</button>
      </div>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="sheet absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between px-5 pb-2 pt-5">
              <h2 className="font-display text-xl font-bold uppercase text-charcoal">Filters</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="grid h-11 w-11 place-items-center text-gray-400 hover:text-charcoal">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l12 12M16 4 4 16" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 overflow-y-auto px-5 py-3 min-[420px]:grid-cols-2">
              <Fields big filters={filters} options={options} onChange={onChange} />
            </div>
            <div className="flex gap-3 border-t border-white/10 p-4">
              <button type="button" onClick={onClear} disabled={activeCount === 0} className={`${clearBtn} min-h-12`}>Clear Filters</button>
              <button type="button" onClick={() => setOpen(false)} className="min-h-12 flex-1 bg-red-600 text-base font-bold text-white transition hover:bg-red-700">
                {resultCount === 0 ? 'No events found' : `Show ${resultCount} ${resultCount === 1 ? 'event' : 'events'}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
