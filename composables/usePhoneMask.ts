/**
 * Formats raw user input into a US phone mask: (555) 123-4567.
 * Strips all non-digits, caps at 10 digits, and progressively applies the
 * mask as the user types. Bind it to a tel input's @input event, e.g.
 *   @input="form.phone = formatPhone(form.phone)"
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length < 4) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
