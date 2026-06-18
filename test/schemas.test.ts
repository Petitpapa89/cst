import { describe, it, expect } from 'vitest'
import { trainingSchema, facilitySchema, contactSchema } from '../server/utils/schemas'

describe('trainingSchema', () => {
  const valid = {
    trainingType: '1on1',
    playerName: 'Sam Tester',
    playerAge: '12',
    email: 'parent@example.com',
  }

  it('accepts a minimal valid payload', () => {
    expect(trainingSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts an optional honeypot field', () => {
    const r = trainingSchema.safeParse({ ...valid, _honey: 'bot' })
    expect(r.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const r = trainingSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0]?.message).toBe('A valid email address is required')
  })

  it('rejects a too-short player name', () => {
    const r = trainingSchema.safeParse({ ...valid, playerName: 'A' })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0]?.message).toBe('Player name is required')
  })

  it('rejects an unknown training type', () => {
    const r = trainingSchema.safeParse({ ...valid, trainingType: 'bogus' })
    expect(r.success).toBe(false)
  })
})

describe('facilitySchema', () => {
  const valid = {
    rentalType: 'team-practice',
    teamName: 'FC Test',
    contactName: 'Pat Coach',
    email: 'coach@example.com',
  }

  it('accepts a minimal valid payload', () => {
    expect(facilitySchema.safeParse(valid).success).toBe(true)
  })

  it('rejects an unknown rental type', () => {
    expect(facilitySchema.safeParse({ ...valid, rentalType: 'nope' }).success).toBe(false)
  })

  it('requires a contact name', () => {
    const r = facilitySchema.safeParse({ ...valid, contactName: '' })
    expect(r.success).toBe(false)
  })

  it('accepts a recurring schedule with an end date', () => {
    const r = facilitySchema.safeParse({
      ...valid,
      preferredDate: '2026-06-27',
      repeat: 'Weekly',
      repeatUntil: '2026-08-01',
      repeatNoEnd: false,
      scheduleNote: 'Flexible on the exact day',
    })
    expect(r.success).toBe(true)
  })

  it('accepts an ongoing recurrence with no end date', () => {
    const r = facilitySchema.safeParse({
      ...valid,
      preferredDate: '2026-06-27',
      repeat: 'Monthly',
      repeatNoEnd: true,
    })
    expect(r.success).toBe(true)
  })

  it('rejects a non-boolean repeatNoEnd', () => {
    const r = facilitySchema.safeParse({ ...valid, repeatNoEnd: 'yes' })
    expect(r.success).toBe(false)
  })

  it('coerces a numeric playerCount to a string', () => {
    // Vue casts type="number" inputs to a JS number before submit.
    const r = facilitySchema.safeParse({ ...valid, playerCount: 12 })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.playerCount).toBe('12')
  })
})

describe('contactSchema', () => {
  const valid = {
    name: 'Jamie Parent',
    email: 'jamie@example.com',
    interest: 'general',
    message: 'I have a question about scheduling.',
  }

  it('accepts a valid payload', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects a too-short message', () => {
    const r = contactSchema.safeParse({ ...valid, message: 'hi' })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0]?.message).toBe('Please include a message')
  })
})
