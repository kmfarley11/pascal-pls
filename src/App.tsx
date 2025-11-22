import { useEffect, useState } from 'react'
import { loadQuotes, getTodaysQuoteIndex } from './utils/loadQuotes'
import type { Quote } from './utils/loadQuotes'

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

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
    } catch (e) {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 md:py-20">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Pascal pls</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Whimsical otter wisdom, one quote at a time.</h1>
          </div>
          <span className="hidden rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 md:inline-flex">Tailwind v4 wired</span>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-rose-100/50 backdrop-blur">
          {loading ? (
            <p className="text-lg font-medium text-slate-600">Loading quote…</p>
          ) : error ? (
            <p className="text-lg font-medium text-rose-600">{error}</p>
          ) : (
            <>
              <p className="text-lg font-medium text-slate-800">{currentQuote}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleShuffle}
                  disabled={quotes.length <= 1}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:opacity-50"
                >
                  Shuffle
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!currentQuote}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:text-rose-700 disabled:opacity-50"
                >
                  Copy quote
                </button>

                {copied && <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Copied!</span>}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
