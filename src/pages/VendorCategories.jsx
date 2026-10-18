import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import { VENDOR_CATEGORIES, VENDOR_FORM_URLS } from '../data/vendorCategories.js'

function getFormUrl(categoryName) {
  const url = VENDOR_FORM_URLS[categoryName]
  // If it's still a placeholder, return null so we can handle gracefully
  if (!url || url.startsWith('GOOGLE_FORM_URL_')) return null
  return url
}

export default function VendorCategories() {
  const handleVendorClick = (categoryName) => {
    const url = getFormUrl(categoryName)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      alert(`The registration form for "${categoryName}" is not yet available. Please check back soon.`)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal py-20 sm:py-28" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />
        <div className="container-page">
          <Link
            to="/sponsor"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Become a Sponsor
          </Link>
          <p className="section-label mb-4 text-red-400">Vendor Registration</p>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-tight text-white sm:text-7xl">
            Vendor<br />
            <span className="text-red-500">Categories</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Select your service category below and register as a vendor for Arena India events. Your category will be automatically filled in the registration form.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-gray-100 bg-white py-10">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-gray-500 sm:gap-8">
            {[
              ['1', 'Choose your category'],
              ['2', 'Click Become a Vendor'],
              ['3', 'Fill in your details'],
              ['4', 'Submit your application'],
            ].map(([step, label], i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-red-600 text-xs font-bold text-white">
                  {step}
                </div>
                <span className="text-charcoal">{label}</span>
                {i < arr.length - 1 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="hidden text-gray-300 sm:block" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-offwhite py-20">
        <div className="container-page">
          <SectionHeading
            title="Select a Category"
            subtitle="Each category has a dedicated registration form. Your selection is pre-filled automatically."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {VENDOR_CATEGORIES.map((category) => (
              <div
                key={category.name}
                className="group flex flex-col border border-gray-200 bg-white p-6 transition hover:border-red-600 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-red-600/10 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={category.icon} />
                  </svg>
                </div>

                {/* Name */}
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-charcoal">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-sm text-gray-500">
                  {category.description}
                </p>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handleVendorClick(category.name)}
                  className="mt-5 w-full bg-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-700"
                >
                  Become a Vendor
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-16">
        <div className="container-page flex flex-col items-center gap-6 border border-gray-200 p-10 text-center sm:p-14">
          <div className="mb-2 h-1 w-12 bg-red-600" />
          <h2 className="font-display text-3xl font-extrabold uppercase text-charcoal sm:text-4xl">
            Not sure which category fits?
          </h2>
          <p className="max-w-lg text-base text-gray-500">
            Reach out to us directly and we'll help you find the right vendor category for your services.
          </p>
          <a
            href="mailto:vendors@arenaindia.in"
            className="bg-red-600 px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-red-700"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  )
}
