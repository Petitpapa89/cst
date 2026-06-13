// Loads the Umami analytics script — only in production and only when both
// the script src and website ID are configured. Until then, this is a no-op
// and track() calls fall back to console logging (see composables/useAnalytics.ts).
export default defineNuxtPlugin(() => {
  const { umamiSrc, umamiWebsiteId } = useRuntimeConfig().public.analytics

  if (!import.meta.client) return
  if (import.meta.dev) return
  if (!umamiSrc || !umamiWebsiteId) return

  const script = document.createElement('script')
  script.defer = true
  script.src = umamiSrc
  script.setAttribute('data-website-id', umamiWebsiteId)
  document.head.appendChild(script)
})
