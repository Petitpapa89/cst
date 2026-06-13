import { defineVitestConfig } from '@nuxt/test-utils/config'

// Default environment is node — fast for pure unit tests (utils, schemas).
// Component tests opt into the Nuxt environment per-file with a docblock:
//   // @vitest-environment nuxt
export default defineVitestConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.{test,spec}.ts'],
  },
})
