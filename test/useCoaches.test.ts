import { describe, it, expect } from 'vitest'
import { useCoaches } from '../composables/useCoaches'

describe('useCoaches', () => {
  it('exposes the coaches array', () => {
    const { coaches } = useCoaches()
    expect(coaches.length).toBeGreaterThan(0)
    expect(coaches.every(c => c.slug && c.name)).toBe(true)
  })

  it('getCoach returns the matching coach by slug', () => {
    const { getCoach } = useCoaches()
    const coach = getCoach('oumar-djiba')
    expect(coach?.name).toBe('Oumar Djiba')
  })

  it('getCoach returns null for an unknown slug', () => {
    const { getCoach } = useCoaches()
    expect(getCoach('does-not-exist')).toBeNull()
  })
})
