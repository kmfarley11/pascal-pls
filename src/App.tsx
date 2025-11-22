import { useEffect, useRef, useState } from 'react'
import { loadQuotes, getTodaysQuoteIndex } from './utils/loadQuotes'
import type { Quote } from './utils/loadQuotes'

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutButtonRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    let mounted = true
    loadQuotes()
      .then(({ quotes }) => {
        if (!mounted) return
        setQuotes(quotes)
        const idx = getTodaysQuoteIndex(quotes, new Date())
        setCurrentIndex(idx)
      })
      .catch((err) => {
        if (!mounted) return
        setError(String(err))
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  // Manage focus when About modal opens/closes and handle Escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setAboutOpen(false)
    }

    if (aboutOpen) {
      document.addEventListener('keydown', onKey)
      // focus the close button when opening
      requestAnimationFrame(() => closeButtonRef.current?.focus())
    } else {
      document.removeEventListener('keydown', onKey)
      // return focus to the About button
      requestAnimationFrame(() => aboutButtonRef.current?.focus())
    }

    return () => document.removeEventListener('keydown', onKey)
  }, [aboutOpen])

  const currentQuote = currentIndex !== null && quotes.length > 0 ? quotes[currentIndex] : ''

  function handleShuffle() {
    if (quotes.length <= 1) return
    let next = currentIndex ?? 0
    if (quotes.length === 2) {
      next = (next + 1) % quotes.length
      setCurrentIndex(next)
      return
    }

    let attempts = 0
    while (next === currentIndex && attempts < 10) {
      next = Math.floor(Math.random() * quotes.length)
      attempts++
    }

    if (next === currentIndex && currentIndex !== null) {
      next = (currentIndex + 1) % quotes.length
    }

    setCurrentIndex(next)
  }

  async function handleCopy() {
    if (!currentQuote) return
    try {
      await navigator.clipboard.writeText(currentQuote)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-rose-50 via-white to-violet-50 text-slate-900">
      {/* accessible live region for status messages (e.g., copied) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? 'Copied quote to clipboard' : ''}
      </div>

      <div className="mx-auto flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-3xl flex flex-col gap-6 py-12 md:py-20">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Pascal pls</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Whimsical otter wisdom, one quote at a time.</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              ref={aboutButtonRef}
              onClick={() => setAboutOpen(true)}
              className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            >
              About
            </button>
            <span className="hidden rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 md:inline-flex">Tailwind v4 wired</span>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-rose-100/60 backdrop-blur-sm motion-safe:transition-transform motion-safe:duration-500">
          {loading ? (
            <p className="text-lg font-medium text-slate-600">Loading quote…</p>
          ) : error ? (
            <p className="text-lg font-medium text-rose-600">{error}</p>
          ) : (
            <>
              <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed">“{currentQuote}”</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleShuffle}
                  disabled={quotes.length <= 1}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:opacity-50"
                >
                  Another pearl
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!currentQuote}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:text-rose-700 disabled:opacity-50"
                >
                  Copy quote
                </button>

                {copied && (
                  <span
                    className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 transition-opacity duration-200"
                    aria-hidden="true"
                  >
                    Copied!
                  </span>
                )}
              </div>
            </>
          )}
        </section>

        <footer className="text-center text-sm text-slate-500">A cozy, fan-made site — unofficial</footer>
        </div>
      </div>

        {/* About modal */}
        {aboutOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
            aria-hidden={!aboutOpen}
          >
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setAboutOpen(false)}
              aria-hidden="true"
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-title"
              className="z-10 max-w-xl rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="about-title" className="text-lg font-semibold text-slate-900">About</h2>
                  <p className="mt-2 text-sm text-slate-700">This is an unofficial fan project inspired by Pascal from Animal Crossing: New Horizons. Animal Crossing and Nintendo Switch are trademarks of Nintendo. This site is not affiliated with or endorsed by Nintendo.</p>
                </div>
                <div className="flex items-start">
                  <button
                    ref={closeButtonRef}
                    onClick={() => setAboutOpen(false)}
                    className="ml-4 rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700 hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </main>
  )
}

export default App
