export type Quote = string

export interface QuotesResult {
  quotes: Quote[]
}

const DEFAULT_QUOTES_PATH = '/quotes.txt'

/**
 * Fetches the newline-delimited quotes file and returns a clean list of quotes.
 */
export async function loadQuotes(path = DEFAULT_QUOTES_PATH): Promise<QuotesResult> {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Failed to load quotes from ${path}: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()

  const quotes = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (quotes.length === 0) {
    throw new Error('Quotes file is empty. Add at least one quote to public/quotes.txt.')
  }

  return { quotes }
}

/**
 * Deterministically pick an index for "today" based on the UTC date.
 * This ensures the same quote is chosen for all users on the same day.
 */
export function getTodaysQuoteIndex(quotes: Quote[], date = new Date()): number {
  if (!quotes || quotes.length === 0) return 0

  // Use UTC date components so timezone differences don't change the selection.
  const utcDays = Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000,
  )

  return Math.abs(utcDays) % quotes.length
}
