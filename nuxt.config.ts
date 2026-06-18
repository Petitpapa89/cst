export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpTo: process.env.SMTP_TO || '',
    smtpFrom: process.env.SMTP_FROM || 'CST Website',
    public: {
      analytics: {
        // Umami. Both must be set for the script to load in production.
        // src = full URL to your Umami script.js, websiteId = the site UUID.
        umamiSrc: process.env.NUXT_PUBLIC_ANALYTICS_UMAMI_SRC || '',
        umamiWebsiteId: process.env.NUXT_PUBLIC_ANALYTICS_UMAMI_WEBSITE_ID || '',
      },
    },
  },
  app: {
    head: {
      title: 'CST — Chiennee Soccer Training',
      meta: [
        { name: 'description', content: 'Private soccer training focused on technical development, confidence, decision-making, and character.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800;900&display=swap' },
      ],
    },
  },
})
