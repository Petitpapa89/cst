import { describe, it, expect } from 'vitest'
import { useCoaches } from '../composables/useCoaches'

describe('useCoaches', () => {
  it('exposes the coaches array', () => {
    const { coaches } = useCoaches()
    expect(coaches.length).toBeGreaterThan(0)
    expect(coaches.every(c => c.slug && c.name)).toBe(true)
  })
})
