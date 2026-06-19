export interface Program {
  title: string
  /** Short one-liner used on the home page cards. */
  tagline: string
  /** Longer description used on the /programs page. */
  description: string
  /** Bullet points shown on the /programs page. */
  bestFor: string[]
  price: string
  priceUnit: string
  priceNote?: string
  /** Button label on the /programs page. */
  cta: string
  to: string
  svgPath: string
  iconBg: string
  iconColor: string
  /** Button colors on the /programs page. */
  ctaBg: string
}

// Single source of truth for every training program + its pricing. Rendered on both
// the home "Training Programs" section (title/tagline/price) and the /programs page
// (description/bestFor/cta). Update prices here and both pages stay in sync.
const programs: Program[] = [
  {
    title: '1-on-1 Private Training',
    tagline: 'Personalized sessions focused on technical ability, confidence, and individual development.',
    description: 'Personalized training focused on technical ability, confidence, and individual development. Work directly with a CST coach to address your specific needs and accelerate your growth.',
    bestFor: ['Players needing focused individual attention', 'Technical skill improvement', 'Confidence and decision-making', 'Position-specific development'],
    price: '$55',
    priceUnit: 'per session',
    cta: 'Inquire About Private Training',
    to: '/inquire/training',
    svgPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    ctaBg: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Small Group Training',
    tagline: 'Competitive sessions with realistic pressure and game-like decision-making.',
    description: 'Competitive sessions with a small number of players, designed to create realistic pressure and game-like decision-making. Train harder together and push each other to improve.',
    bestFor: ['Friends or teammates training together', 'Competitive touches and pressure', 'Game-like development', 'Building chemistry with teammates'],
    price: '$35',
    priceUnit: 'per player',
    priceNote: 'Up to 6 players',
    cta: 'Inquire About Small Group',
    to: '/inquire/training',
    svgPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    ctaBg: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Team Training',
    tagline: 'Technical development, game intelligence, and tactical habits for full teams.',
    description: 'Structured sessions for full teams focused on technical development, game intelligence, and tactical habits. Elevate your entire roster together.',
    bestFor: ['Club and recreational teams', 'Off-season development', 'Team chemistry and communication', 'Technical and tactical improvement'],
    price: '$150',
    priceUnit: 'per session',
    cta: 'Request Team Training',
    to: '/inquire/training',
    svgPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    ctaBg: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    title: 'Speed & Agility',
    tagline: 'Movement training for acceleration, change of direction, balance, and explosiveness.',
    description: 'Movement training focused on acceleration, change of direction, balance, explosiveness, and injury prevention. Become a faster, more athletic player.',
    bestFor: ['Faster first step and acceleration', 'Better body control and balance', 'Athletic development at any level', 'Injury prevention and movement quality'],
    price: '$55',
    priceUnit: 'per session',
    cta: 'Inquire About Speed & Agility',
    to: '/inquire/training',
    svgPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    ctaBg: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    title: 'Indoor Facility Rental',
    tagline: 'Book our private facility for team practices, games, events, and independent sessions.',
    description: 'Book our private indoor facility for team practices, private games, small-sided matches, birthday soccer events, and independent training sessions.',
    bestFor: ['Team practices and scrimmages', 'Private games and small-sided matches', 'Birthday soccer events', 'Club and independent trainer sessions'],
    price: '$75',
    priceUnit: 'per hour',
    cta: 'Inquire About Facility Rental',
    to: '/inquire/facility',
    svgPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    ctaBg: 'bg-slate-800 hover:bg-slate-700',
  },
]

export function usePrograms() {
  return { programs }
}
