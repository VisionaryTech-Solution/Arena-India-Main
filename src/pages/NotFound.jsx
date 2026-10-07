import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="section-label mb-4">404 Error</p>
      <h1 className="font-display text-6xl font-extrabold uppercase text-charcoal sm:text-8xl">Not Found</h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-gray-500">That page doesn't exist or has been moved.</p>
      <Link to="/" className="mt-8 inline-block bg-red-600 px-8 py-4 text-base font-bold text-white transition hover:bg-red-700">
        Go to Homepage
      </Link>
    </section>
  )
}
