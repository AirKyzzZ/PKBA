import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { requireAdmin, checkPassword, sessionToken, ADMIN_COOKIE } from '@/lib/admin-auth'

const req = (cookie?: string) => {
  const r = new NextRequest('https://pkba.vertiflow.fr/api/get-inscriptions/')
  if (cookie) r.cookies.set(ADMIN_COOKIE, cookie)
  return r
}

describe('checkPassword', () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'un-mot-de-passe-long'
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it('accepte le bon mot de passe', () => {
    expect(checkPassword('un-mot-de-passe-long')).toBe(true)
  })

  it('refuse un mauvais mot de passe', () => {
    expect(checkPassword('vertiflow')).toBe(false)
  })

  it('refuse une valeur vide ou non textuelle', () => {
    expect(checkPassword('')).toBe(false)
    expect(checkPassword(undefined)).toBe(false)
    expect(checkPassword(42)).toBe(false)
  })

  it("refuse tout quand le serveur n'a pas de mot de passe configuré", () => {
    delete process.env.ADMIN_PASSWORD
    expect(checkPassword('quoi que ce soit')).toBe(false)
  })
})

describe('requireAdmin', () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'un-mot-de-passe-long'
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it('refuse une requête sans cookie', () => {
    expect(requireAdmin(req())?.status).toBe(401)
  })

  it('refuse un cookie forgé', () => {
    expect(requireAdmin(req('nimportequoi'))?.status).toBe(401)
  })

  it('refuse un jeton dérivé du mauvais mot de passe', () => {
    expect(requireAdmin(req(sessionToken('vertiflow')))?.status).toBe(401)
  })

  it('laisse passer un jeton valide', () => {
    expect(requireAdmin(req(sessionToken('un-mot-de-passe-long')))).toBeNull()
  })

  it("bloque en 503 plutôt que d'ouvrir quand ADMIN_PASSWORD manque", () => {
    delete process.env.ADMIN_PASSWORD
    expect(requireAdmin(req(sessionToken('un-mot-de-passe-long')))?.status).toBe(503)
  })

  it('ne met jamais le mot de passe dans le jeton', () => {
    expect(sessionToken('un-mot-de-passe-long')).not.toContain('un-mot-de-passe-long')
  })
})
