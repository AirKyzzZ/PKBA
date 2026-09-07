import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_COOKIE = 'pkba_admin'
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60

const adminPassword = () => process.env.ADMIN_PASSWORD

export const sessionToken = (password: string): string =>
  createHmac('sha256', password).update('pkba-admin-session').digest('hex')

const equal = (a: string, b: string): boolean => {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function checkPassword(candidate: unknown): boolean {
  const expected = adminPassword()
  if (!expected || typeof candidate !== 'string' || candidate === '') return false
  return equal(candidate, expected)
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  const expected = adminPassword()
  if (!expected) {
    console.error('[admin] ADMIN_PASSWORD absent, acces administration refuse')
    return NextResponse.json(
      { message: "Administration non configurée sur le serveur" },
      { status: 503 },
    )
  }
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value
  if (!cookie || !equal(cookie, sessionToken(expected))) {
    return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
  }
  return null
}
