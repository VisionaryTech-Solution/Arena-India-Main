const STATUS = {
  Upcoming: 'bg-sky-100 text-sky-700',
  'Registration Open': 'bg-emerald-100 text-emerald-700',
  Live: 'bg-red-100 text-red-700',
  Completed: 'bg-gray-100 text-gray-500',
}
const VERIFY = {
  Verified: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Unverified: 'bg-gray-100 text-gray-500',
}

export const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 text-xs font-bold ${STATUS[status] || STATUS.Upcoming}`}>{status}</span>
)
export const VerificationBadge = ({ status }) => (
  <span className={`px-3 py-1 text-xs font-bold ${VERIFY[status] || VERIFY.Unverified}`}>
    {status === 'Verified' ? 'Verified' : `Verification ${status.toLowerCase()}`}
  </span>
)
