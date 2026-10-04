const STATUS = {
  Upcoming: 'bg-sky-400/15 text-sky-300',
  'Registration Open': 'bg-emerald-400/15 text-emerald-300',
  Live: 'bg-red-500/20 text-red-300',
  Completed: 'bg-slate-500/20 text-slate-400',
}
const VERIFY = {
  Verified: 'bg-emerald-400/15 text-emerald-300',
  Pending: 'bg-amber-400/15 text-amber-300',
  Unverified: 'bg-slate-500/20 text-slate-400',
}

export const StatusBadge = ({ status }) => (
  <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS[status] || STATUS.Upcoming}`}>{status}</span>
)
export const VerificationBadge = ({ status }) => (
  <span className={`rounded-full px-3 py-1 text-xs font-bold ${VERIFY[status] || VERIFY.Unverified}`}>
    {status === 'Verified' ? 'Verified' : `Verification ${status.toLowerCase()}`}
  </span>
)
