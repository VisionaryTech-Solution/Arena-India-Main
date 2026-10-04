// Temporary page wrapper for placeholder routes. Replace per page as features are built.
export default function PageShell({ title, description, children }) {
  return (
    <section className="container-page py-16 sm:py-24">
      <h1 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">{title}</h1>
      {description && <p className="mt-5 max-w-xl text-lg text-slate-400">{description}</p>}
      <div className="mt-10 rounded-2xl border border-dashed border-white/15 bg-navy-900/50 p-8 text-sm text-slate-400">
        {children ?? 'This page is part of the foundation and will be built in a later step.'}
      </div>
    </section>
  )
}
