import { describe, it, expect } from 'vitest'
import { sanitizeStr, escapeHtml } from '../server/utils/sanitize'

describe('sanitizeStr', () => {
  it('replaces CR/LF/tab with spaces (email header injection guard)', () => {
    expect(sanitizeStr('a\r\nb\tc')).toBe('a  b c')
  })

  it('strips header-injection attempts', () => {
    const result = sanitizeStr('victim@example.com\nBcc: attacker@evil.com')
    expect(result).not.toContain('\n')
    expect(result).toBe('victim@example.com Bcc: attacker@evil.com')
  })

  it('trims surrounding whitespace', () => {
    expect(sanitizeStr('  hello  ')).toBe('hello')
  })

  it('leaves clean strings unchanged', () => {
    expect(sanitizeStr('Oumar Djiba')).toBe('Oumar Djiba')
  })
})

describe('escapeHtml', () => {
  it('escapes all five HTML-sensitive characters', () => {
    expect(escapeHtml(`& < > " '`)).toBe('&amp; &lt; &gt; &quot; &#x27;')
  })

  it('neutralizes a script tag', () => {
    expect(escapeHtml('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    )
  })

  it('escapes ampersand before other entities (no double-escape bug)', () => {
    expect(escapeHtml('a&b')).toBe('a&amp;b')
  })
})
