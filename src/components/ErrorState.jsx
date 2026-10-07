export default function ErrorState({ title = 'Events couldn\u2019t be loaded', message = 'We couldn\u2019t reach the events service. Check your connection and try again.', onRetry }) {
  return (
    <div role="alert" className="border border-dashed border-red-200 bg-red-50 px-6 py-14 text-center">
      <h2 className="font-display text-2xl font-extrabold uppercase text-charcoal sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-gray-500">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-7 bg-red-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-red-700">
          Try again
        </button>
      )}
    </div>
  )
}
