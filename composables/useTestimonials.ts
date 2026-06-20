export interface Testimonial {
  name: string
  quote: string
  rating: number
}

// Curated, real testimonials. Add one here to show it in the home "What Players
// & Families Say" section. Keep quotes verbatim.
const testimonials: Testimonial[] = [
  {
    name: 'Javier Guajardo',
    rating: 5,
    quote: `My son had been going to Coach Oumar's camp for the last two years and to be honest, this is the best camp experience he has ever had. You can tell that Coach Oumar spends hours developing the drills because they are challenging, engaging, and fun. The camp is constantly flowing with no dead time. And Coach prices it at 1/3 the cost of other camps be he legitimately wants players to improve. My son has attended other camps in the past but none of them were anywhere close to the skill, attention to detail, or value provided by Coach Oumar.`,
  },
  {
    name: 'Ryan Guajardo',
    rating: 5,
    quote: `Absolutely fantastic experience! The soccer coach is truly exceptional, bringing out the best in every player with their expert guidance and motivational style. The training sessions are incredibly well-organized, challenging, and tailored to individual needs, ensuring continuous improvement and growth. The coach's passion for the game is infectious, making every session not only educational but also fun and engaging. Highly recommend for anyone looking to elevate their soccer skills to the next level! Five stars all the way!`,
  },
  {
    name: 'Matt Davenport',
    rating: 5,
    quote: `My son has been doing trainings with coach Oumar for both group and individual sessions for the past couple of years. We have tried several trainings in the area and this program is by far the best training program I have seen. Would HIGHLY recommend.`,
  },
  {
    name: 'Jayden Elskes',
    rating: 5,
    quote: `Omar's coaching philosophy is rooted in a deep understanding of individual needs and aspirations. He tailors his training programs meticulously, recognizing that each athlete is unique in their strengths and areas for improvement. Whether refining techniques, strategizing for competitions, or building mental resilience, Omar ensures that every aspect of an athlete's development is carefully addressed.`,
  },
  {
    name: 'Titis Corral',
    rating: 5,
    quote: `This is the second year my daughter has come to the summer camp. I really like seeing the progress she has made. The effort and support that Oumar puts into helping the children improve helps them to love and respect soccer.`,
  },
]

export function useTestimonials() {
  return { testimonials }
}
