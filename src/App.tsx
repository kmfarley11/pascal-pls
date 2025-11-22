function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 md:py-20">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              Pascal pls
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Whimsical otter wisdom, one quote at a time.
            </h1>
          </div>
          <span className="hidden rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 md:inline-flex">
            Tailwind v4 wired
          </span>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-rose-100/50 backdrop-blur">
          <p className="text-lg font-medium text-slate-800">
            Next up: hook quotes + shuffle/copy. For now this is a placeholder card to confirm Tailwind is
            active.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">
              Shuffle
            </button>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">
              Copy quote
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
