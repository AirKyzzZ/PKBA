export const SHIPPING_CENTS = 499
export const CUSTOMIZATION_CENTS = 500
const MAX_QUANTITY = 20

const PRICES_CENTS: Record<string, number> = {
  'T-shirt Officiel PKBA': 1999,
  'Sweat à capuche PKBA': 4999,
  'Short athlétique PKBA': 3499,
}

export type OrderItem = {
  name?: unknown
  quantity?: unknown
  customization?: unknown
}

export function computeOrderAmount(items: unknown): number | null {
  if (!Array.isArray(items) || items.length === 0) return null
  let total = SHIPPING_CENTS
  for (const item of items as OrderItem[]) {
    const unit = typeof item?.name === 'string' ? PRICES_CENTS[item.name] : undefined
    const quantity = item?.quantity
    if (unit === undefined) return null
    if (!Number.isInteger(quantity) || (quantity as number) < 1 || (quantity as number) > MAX_QUANTITY) return null
    const extra = typeof item.customization === 'string' && item.customization.trim() ? CUSTOMIZATION_CENTS : 0
    total += (unit + extra) * (quantity as number)
  }
  return total
}
