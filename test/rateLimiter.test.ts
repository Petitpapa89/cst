import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { checkRateLimit } from '../server/utils/rateLimiter'

// The limiter keeps an in-memory Map keyed by IP, so each test uses a unique
// IP to stay isolated. WINDOW_MS = 10 min, MAX_REQUESTS = 5.

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows the first 5 requests and blocks the 6th', () => {
    const ip = '10.0.0.1'
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip)).toBe(true)
    }
    expect(checkRateLimit(ip)).toBe(false)
  })

  it('resets after the 10-minute window elapses', () => {
    const ip = '10.0.0.2'
    for (let i = 0; i < 5; i++) checkRateLimit(ip)
    expect(checkRateLimit(ip)).toBe(false)

    vi.advanceTimersByTime(10 * 60 * 1000 + 1)
    expect(checkRateLimit(ip)).toBe(true)
  })

  it('tracks IPs independently', () => {
    const a = '10.0.0.3'
    const b = '10.0.0.4'
    for (let i = 0; i < 5; i++) checkRateLimit(a)
    expect(checkRateLimit(a)).toBe(false)
    expect(checkRateLimit(b)).toBe(true)
  })
})
