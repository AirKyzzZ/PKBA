import { describe, it, expect } from 'vitest'
import { toCsv } from '@/lib/csv'

const parse = (csv: string): string[][] =>
  csv.replace(/^﻿/, '').split('\r\n').map((line) => {
    const cells: string[] = []
    let current = ''
    let quoted = false
    for (let i = 0; i < line.length; i++) {
      const c = line[i]
      if (quoted && c === '"' && line[i + 1] === '"') { current += '"'; i++ }
      else if (c === '"') quoted = !quoted
      else if (c === ',' && !quoted) { cells.push(current); current = '' }
      else current += c
    }
    cells.push(current)
    return cells
  })

describe('toCsv', () => {
  it('garde le même nombre de colonnes malgré virgules, guillemets et tableaux', () => {
    const rows = parse(toCsv([
      ['Nom', 'Adresse', 'Adhésion', 'Note'],
      ['Martin', '1 rue du Port, bât. B', ['Ancien Adhérent', 'Nouvel Adhérent'], 'dit "Lulu"'],
    ]))
    expect(rows.map((r) => r.length)).toEqual([4, 4])
    expect(rows[1]).toEqual(['Martin', '1 rue du Port, bât. B', 'Ancien Adhérent, Nouvel Adhérent', 'dit "Lulu"'])
  })

  it('écrit une cellule vide pour null et undefined', () => {
    expect(parse(toCsv([[null, undefined, 0]]))[0]).toEqual(['', '', '0'])
  })

  it('commence par un BOM pour que les accents passent dans Excel', () => {
    expect(toCsv([['é']]).startsWith('﻿')).toBe(true)
  })
})
