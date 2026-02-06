const TOKEN_MAP: Record<string, string[]> = {
  'random sweet food': [
    'cinnamon roll',
    'churro',
    'donut',
    'macaron',
    'maple fudge',
    'milkshake',
    'mochi',
    'peanut brittle',
    'brownie',
    'cheesecake',
    'caramel apple',
  ],
  'random savory food': [
    'garlic knot',
    'soft pretzel',
    'cheddar biscuit',
    'nachos',
    'stuffed mushroom',
    'spinach artichoke dip',
    'empanada',
    'mini quiche',
    'potato wedge',
    'fried pickle',
    'pigs in a blanket',
  ],
  'random object': [
    'rubber duck',
    'pocket compass',
    'lucky pebble',
    'tiny lighthouse',
    'shoelace bow',
    'paperclip chain',
    'pocket notebook',
    'snow globe',
    'origami crane',
    'wind-up robot',
    'toy astronaut',
  ],
}

const FALLBACKS: Record<string, string> = {
  'random sweet food': 'sweet treat',
  'random savory food': 'savory snack',
  'random object': 'trinket',
}

function chooseRandom<T>(items: T[], random: () => number): T | undefined {
  if (!items.length) return undefined
  const index = Math.floor(random() * items.length)
  return items[index]
}

/**
 * Return a random sweet treat from a small, cozy list.
 * Kept for backwards compatibility.
 */
export function getRandomSweetFood(random: () => number = Math.random): string {
  const pick = chooseRandom(TOKEN_MAP['random sweet food'], random)
  return pick ?? FALLBACKS['random sweet food']
}

/**
 * Replace any supported `<random …>` token in a quote with a random pick.
 */
export function fillQuoteTokens(quote: string, random: () => number = Math.random): string {
  const tokenPattern = /<([^>]+)>/g
  return quote.replace(tokenPattern, (match, inner) => {
    const key = String(inner).toLowerCase().trim()
    if (!(key in TOKEN_MAP)) return match
    const pick = chooseRandom(TOKEN_MAP[key], random) ?? FALLBACKS[key] ?? match
    return pick
  })
}

