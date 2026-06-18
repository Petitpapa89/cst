import { z } from 'zod'

// Shared request schemas for the inquiry/contact API routes.
// Extracted from the route handlers so they can be unit-tested in isolation.

export const trainingSchema = z.object({
  trainingType: z.enum(['1on1', 'small-group', 'team', 'speed-agility']),
  coachPreference: z.string().max(100).optional(),
  playerName: z.string().min(2, 'Player name is required').max(100),
  playerAge: z.string().min(1, 'Player age is required').max(30),
  parentName: z.string().max(100).optional(),
  email: z.string().email('A valid email address is required').max(254),
  phone: z.string().max(20).optional(),
  preferredDays: z.array(z.string().max(15)).max(7).optional(),
  preferredTime: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  _honey: z.string().optional(),
})

export const facilitySchema = z.object({
  rentalType: z.enum(['team-practice', 'private-game', 'small-sided', 'birthday', 'club-training', 'independent']),
  teamName: z.string().min(2, 'Team or group name is required').max(100),
  contactName: z.string().min(2, 'Contact name is required').max(100),
  email: z.string().email('A valid email address is required').max(254),
  phone: z.string().max(20).optional(),
  preferredDate: z.string().max(100).optional(),
  repeat: z.string().max(30).optional(),
  repeatUntil: z.string().max(30).optional(),
  repeatNoEnd: z.boolean().optional(),
  scheduleNote: z.string().max(500).optional(),
  preferredTime: z.string().max(50).optional(),
  duration: z.string().max(20).optional(),
  // type="number" input — Vue casts it to a JS number, so coerce back to string.
  playerCount: z.coerce.string().max(10).optional(),
  _honey: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('A valid email address is required').max(254),
  phone: z.string().max(20).optional(),
  playerAge: z.string().max(20).optional(),
  interest: z.enum(['training', 'facility', 'general']),
  message: z.string().min(10, 'Please include a message').max(2000),
  _honey: z.string().optional(),
})

export type TrainingInput = z.infer<typeof trainingSchema>
export type FacilityInput = z.infer<typeof facilitySchema>
export type ContactInput = z.infer<typeof contactSchema>
