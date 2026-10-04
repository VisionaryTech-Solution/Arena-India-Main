const parse = (iso) => new Date(`${iso}T00:00:00`)
const f = (iso, o) => parse(iso).toLocaleDateString('en-IN', o)

export function formatDateRange(start, end) {
  if (!end || end === start) return f(start, { day: 'numeric', month: 'short', year: 'numeric' })
  const sameYear = parse(start).getFullYear() === parse(end).getFullYear()
  const left = f(start, sameYear ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' })
  return `${left} to ${f(end, { day: 'numeric', month: 'short', year: 'numeric' })}`
}

export const formatFullDate = (iso) =>
  f(iso, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
