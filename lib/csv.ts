const cell = (value: unknown): string => {
  const text = Array.isArray(value) ? value.join(', ') : value == null ? '' : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

export const toCsv = (rows: unknown[][]): string =>
  '﻿' + rows.map((row) => row.map(cell).join(',')).join('\r\n')
