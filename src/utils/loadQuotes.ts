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
