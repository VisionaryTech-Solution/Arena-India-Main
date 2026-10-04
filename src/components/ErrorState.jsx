export default function ErrorState({ title = 'Events couldn\u2019t be loaded', message = 'We couldn\u2019t reach the events service. Check your connection and try again.', onRetry }) {
  return (
    <div role="alert" className="rounded-3xl border border-dashed border-red-400/30 bg-navy-900/50 px-6 py-14 text-center">
      <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-slate-400">{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="btn-primary mt-7 px-7 py-3">Try again</button>}
    </div>
  )
}
