import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const sendMock = vi.fn()
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock }
  },
}))

import { notifySignup, type SignupNotification } from '@/lib/notifications'

const signup: SignupNotification = {
  kind: 'preinscription',
  recordId: 'recTest123',
  firstName: 'Léa',
  lastName: 'Martin',
  email: 'lea@example.com',
  phone: '0600000000',
  lines: [['Groupe souhaité', 'Loisir 6-8 ans']],
}

describe('notifySignup', () => {
  beforeEach(() => {
    sendMock.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    process.env.RESEND_API_KEY = 're_test'
    process.env.RESEND_FROM_EMAIL = 'contact@pkba.test'
  })
  afterEach(() => vi.restoreAllMocks())

  it("n'envoie rien et le signale quand la configuration manque", async () => {
    delete process.env.RESEND_API_KEY
    expect(await notifySignup(signup)).toEqual({ club: 'skipped', family: 'skipped' })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it("n'envoie rien quand l'expéditeur n'est pas configuré", async () => {
    delete process.env.RESEND_FROM_EMAIL
    expect(await notifySignup(signup)).toEqual({ club: 'skipped', family: 'skipped' })
  })

  it('prévient le club et la famille quand tout va bien', async () => {
    sendMock.mockResolvedValue({ error: null })
    expect(await notifySignup(signup)).toEqual({ club: 'sent', family: 'sent' })
    const destinataires = sendMock.mock.calls.map((c) => c[0].to)
    expect(destinataires).toContain('parkourBA33@gmail.com')
    expect(destinataires).toContain('lea@example.com')
  })

  it('ne jette jamais quand Resend renvoie une erreur', async () => {
    sendMock.mockResolvedValue({ error: { message: 'domain not verified' } })
    await expect(notifySignup(signup)).resolves.toEqual({ club: 'failed', family: 'failed' })
  })

  it('ne jette jamais quand Resend lève une exception', async () => {
    sendMock.mockRejectedValue(new Error('réseau coupé'))
    await expect(notifySignup(signup)).resolves.toEqual({ club: 'failed', family: 'failed' })
  })

  it("met le nom de l'inscrit dans l'objet du mail au club", async () => {
    sendMock.mockResolvedValue({ error: null })
    await notifySignup(signup)
    const auClub = sendMock.mock.calls.find((c) => c[0].to === 'parkourBA33@gmail.com')![0]
    expect(auClub.subject).toContain('Léa Martin')
  })
})
