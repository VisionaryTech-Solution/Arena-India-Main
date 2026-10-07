import { getDataStatus } from '../services/eventsApi.js'

export default function DataNotice() {
  const s = getDataStatus()
  if (!s.fellBack) return null
  return (
    <p role="status" className="mt-6 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
      The events API couldn&rsquo;t be reached, so demo data is shown. {s.error}
    </p>
  )
}
