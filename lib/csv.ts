const FORMULA_START = /^[=+\-@\t\r]/
const NUMERIC = /^[+-]?[\d\s.,]+$/

const cell = (value: unknown): string => {
  const text = Array.isArray(value) ? value.join(', ') : value == null ? '' : String(value)
  const safe = FORMULA_START.test(text) && !NUMERIC.test(text) ? `'${text}` : text
  return `"${safe.replace(/"/g, '""')}"`
}

export const toCsv = (rows: unknown[][]): string =>
  '﻿' + rows.map((row) => row.map(cell).join(',')).join('\r\n')
