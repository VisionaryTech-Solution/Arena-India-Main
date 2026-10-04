import { getDataStatus } from '../services/eventsApi.js'

// Shown only when the API failed and demo data was substituted (always during dev; production only if allowed).
export default function DataNotice() {
  const s = getDataStatus()
  if (!s.fellBack) return null
  return (
    <p role="status" className="mt-6 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-200">
      The events API couldn&rsquo;t be reached, so demo data is shown. {s.error}
    </p>
  )
}
