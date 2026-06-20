export interface Sponsor {
  name: string
  logo: string
  /** Optional link to the sponsor's site. */
  url?: string
}

// Curated list of CST sponsors. Add one here (name + a logo in
// public/images/sponsors/) and it shows in the "Proudly Supported By" section.
const sponsors: Sponsor[] = [
  { name: 'Poke House', logo: '/images/sponsors/poke-house.jpg' },
]

export function useSponsors() {
  return { sponsors }
}
