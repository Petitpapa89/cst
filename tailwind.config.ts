import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand green retuned to the CST logo's kelly green (~#32b450) instead of
        // Tailwind's darker forest green. Every `green-*` class picks this up.
        // -600 is kept a touch deeper so white button text stays legible.
        green: {
          50: '#eefbf0',
          100: '#d6f6dd',
          200: '#aeebbb',
          300: '#76db92',
          400: '#46c768',
          500: '#34b450',
          600: '#2aa54a',
          700: '#218a3c',
          800: '#1d6e32',
          900: '#195a2b',
          950: '#0a2f15',
        },
        // `slate` carries a blue undertone (it's a navy), which read as "blue" on the
        // dark sections. Neutralize it to a true near-black/grey to match the logo's
        // black. Every existing `slate-*` class (backgrounds + text) picks this up.
        slate: {
          50: '#f7f7f8',
          100: '#f1f1f2',
          200: '#e4e4e6',
          300: '#cfcfd2',
          400: '#9d9da3',
          500: '#71717a',
          600: '#52525a',
          700: '#3a423c',
          // Dark end carries a subtle green tint (matching the brand) so every dark
          // section reads as the same green-black instead of a flat neutral.
          800: '#16271a',
          900: '#0e1f12',
          950: '#081109',
        },
      },
    },
  },
} satisfies Config
