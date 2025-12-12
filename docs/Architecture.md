# Architecture & data flow (high level)

Stack choice from PRD:

Vite + React + TypeScript + Tailwind.

Key pieces:

public/quotes.txt
→ Fetched once on app load.

src/utils/loadQuotes.ts

fetch('/quotes.txt')

Split by newline, trim, filter out empties → string[].

src/utils/todaysQuote.ts

Take date (e.g., YYYY-MM-DD), hash to integer, mod by quotes.length, and pick that index.

Result is deterministic per calendar day on the same quotes file.

src/components/QuoteCard.tsx

Props: quote: string, isToday: boolean.

Renders the text in a cozy pastel card.

src/components/ControlsBar.tsx

Buttons: “Give another scallop”, “Copy quote”, maybe an “About” icon.

Emits callbacks: onShuffle, onCopy, onShowAbout.

src/components/AboutModal.tsx

Shows attribution and brief explanation.

src/App.tsx

Holds quotes: string[], currentQuoteIndex, mode (optional).

On mount: load quotes → compute today’s index → set as initial currentQuoteIndex.

Handlers for shuffle + copy.