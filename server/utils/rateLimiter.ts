interface Entry {
  count: number
  resetAt: number
}

const store = new Map<string, Entry>()
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = store.get(ip)
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_REQUESTS) return false
  entry.count++
  return true
}
