// Provider-agnostic event tracking. Call track() anywhere in the app; it routes
// to Umami when the script is loaded (production + configured), and otherwise
// logs to the console in dev so you can verify events fire without an account.

interface UmamiGlobal {
  track: (event: string, data?: Record<string, unknown>) => void
}

declare global {
  interface Window {
    umami?: UmamiGlobal
  }
}

export function useAnalytics() {
  function track(event: string, data?: Record<string, unknown>) {
    if (!import.meta.client) return

    if (window.umami) {
      window.umami.track(event, data)
      return
    }

    // No analytics loaded (dev, or not yet configured) — log so events are visible.
    if (import.meta.dev) {
      // eslint-disable-next-line no-console
      console.log('[analytics]', event, data ?? {})
    }
  }

  return { track }
}
