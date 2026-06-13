// Strip characters that enable email header injection
export function sanitizeStr(val: string): string {
  return val.replace(/[\r\n\t]/g, ' ').trim()
}

// HTML-escape user data inserted into email body HTML
export function escapeHtml(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
