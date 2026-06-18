export interface Coach {
  slug: string
  name: string
  title: string
  initials: string
  specialties: string[]
  sessionTypes: string[]
  bio: string
  philosophy: string
  rateNote: string
}

const coaches: Coach[] = [
  {
    slug: 'oumar-djiba',
    name: 'Oumar Djiba',
    title: 'Head Coach — Former Professional Player',
    initials: 'OD',
    specialties: ['Technical Development', 'Speed & Agility', '1-on-1 Training', 'Youth Player Development'],
    sessionTypes: ['1-on-1 Private', 'Small Group', 'Team Training', 'Speed & Agility'],
    bio: 'Oumar Djiba is a former professional, semi-professional, and college soccer player with over 10 years of coaching experience. He has trained youth, competitive, and advanced players across all levels, helping them develop technical ability, confidence, and love for the game.',
    philosophy: 'Soccer is more than a sport — it is a vehicle for personal growth. My coaching focuses on developing the whole player: technically sharp, mentally confident, and disciplined in effort. Every player deserves to be challenged and supported.',
    rateNote: 'Contact us for current pricing and session availability.',
  },
  // TODO: PLACEHOLDER COACH — replace all fields below with the real second coach's
  // details before deploying. This appears publicly on the /coaches page.
  {
    slug: 'assistant-coach',
    name: 'Assistant Coach',
    title: 'Assistant Coach — Player Development',
    initials: 'AC',
    specialties: ['Technical Development', 'Small Group Training', 'Youth Player Development'],
    sessionTypes: ['1-on-1 Private', 'Small Group', 'Speed & Agility'],
    bio: 'Placeholder bio — replace with the assistant coach\'s background, playing history, and coaching experience.',
    philosophy: 'Placeholder philosophy — replace with this coach\'s approach to developing players.',
    rateNote: 'Contact us for current pricing and session availability.',
  },
]

export function useCoaches() {
  return { coaches }
}
