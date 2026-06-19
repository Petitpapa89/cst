import { describe, it, expect } from 'vitest'
import { usePrograms } from '../composables/usePrograms'

describe('usePrograms', () => {
  it('exposes all programs with the fields both pages need', () => {
    const { programs } = usePrograms()
    expect(programs.length).toBeGreaterThan(0)
    expect(
      programs.every(p => p.title && p.tagline && p.description && p.cta && p.to && p.bestFor.length > 0),
    ).toBe(true)
  })

  it('every program has a formatted price and unit', () => {
    const { programs } = usePrograms()
    expect(programs.every(p => /^\$\d/.test(p.price) && p.priceUnit.length > 0)).toBe(true)
  })
})
