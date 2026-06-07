export const TARIFS_SEASON = '2026 / 2027'
export const TARIFS_PROVISIONAL = true
export const TARIFS_DISCLAIMER = 'Tarifs prévisionnels, susceptibles d\'évoluer.'

export type TarifRow = {
  group: string
  duration: string
  price: number
}

export const SEASON_TARIFS: TarifRow[] = [
  { group: 'Loisirs 3-5 ans', duration: '45 min / semaine', price: 265 },
  { group: 'Loisirs 6-8 ans', duration: '1h / semaine', price: 300 },
  { group: 'Loisirs +8 ans', duration: '1h30 / semaine', price: 350 },
  { group: 'Pré-compét', duration: '2 x 1h30 / semaine', price: 400 },
  { group: 'Perf Petits', duration: '2 x 2h / semaine', price: 420 },
  { group: 'Perf Grands', duration: '3 x 2h / semaine', price: 450 },
]

export type IncludedFee = {
  item: string
  price: number
}

export const INCLUDED_FEES: IncludedFee[] = [
  { item: 'Assurance', price: 17.19 },
  { item: 'Part FFGYM', price: 26.5 },
  { item: 'Part comité régional', price: 17 },
  { item: 'Part comité départemental', price: 4.5 },
]

export const INCLUDED_FEES_TOTAL = Number(
  INCLUDED_FEES.reduce((sum, fee) => sum + fee.price, 0).toFixed(2),
)
