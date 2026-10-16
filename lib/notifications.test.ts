import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const sendMock = vi.fn()
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock }
  },
}))

import {
  notifySignup,
  renderClubEmail,
  renderFamilyEmail,
  type SignupNotification,
} from '@/lib/notifications'

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

  it('fait répondre le club à la famille et la famille au club, en HTML et en texte', async () => {
    sendMock.mockResolvedValue({ error: null })
    await notifySignup(signup)
    const auClub = sendMock.mock.calls.find((c) => c[0].to === 'parkourBA33@gmail.com')![0]
    const aLaFamille = sendMock.mock.calls.find((c) => c[0].to === 'lea@example.com')![0]
    expect(auClub.replyTo).toBe('lea@example.com')
    expect(aLaFamille.replyTo).toBe('parkourBA33@gmail.com')
    for (const mail of [auClub, aLaFamille]) {
      expect(mail.html).toContain('<table')
      expect(mail.text.length).toBeGreaterThan(0)
    }
  })
})

const stageSignup: SignupNotification = {
  kind: 'stage',
  recordId: 'recStage1',
  firstName: '<b>x</b>',
  lastName: 'Martin & "fils"',
  email: 'lea@example.com',
  phone: '0600000000',
  lines: [
    ['Stage', 'Stage Toussaint 2026'],
    ['Formule', 'Formule 1 (10h-16h)'],
    ['Jours', 'Ven 23/10, Mar 27/10'],
    ['Total', '50€'],
    ['Note', '<script>alert(1)</script>'],
  ],
}

describe('rendu des mails', () => {
  const rendus = [renderClubEmail(stageSignup), renderFamilyEmail(stageSignup)]

  it('échappe les valeurs saisies par la famille', () => {
    for (const { html } of rendus) {
      expect(html).not.toContain('<b>x</b>')
      expect(html).not.toContain('<script>')
      expect(html).toContain('&lt;b&gt;x&lt;/b&gt;')
      expect(html).toContain('Martin &amp; &quot;fils&quot;')
    }
  })

  it('affiche la formule et le total dans le HTML et le texte', () => {
    for (const { html, text } of rendus) {
      expect(html).toContain('Formule 1 (10h-16h)')
      expect(html).toContain('50€')
      expect(text).toContain('Formule : Formule 1 (10h-16h)')
      expect(text).toContain('Total : 50€')
    }
  })

  it('pose le logo, le bouton et le pied de page du club', () => {
    const [club, famille] = rendus
    for (const { html } of rendus) {
      expect(html).toContain('https://pkba.vertiflow.fr/images/transparent_full.png')
      expect(html).toContain('alt="PKBA"')
      expect(html).toContain('Gujan-Mestras')
      expect(html).toContain('https://instagram.com/parkourbassindarcachon')
      expect(html).toContain('06 60 14 71 44')
    }
    expect(famille.html).toContain('https://pkba.vertiflow.fr/stage/')
    expect(famille.text).toContain('https://pkba.vertiflow.fr/stage/')
    expect(renderFamilyEmail({ ...signup }).html).toContain('https://pkba.vertiflow.fr/horaires/')
    expect(club.subject).toBe('Inscription au stage : <b>x</b> Martin & "fils"')
  })

  it("adapte les mails à une réponse pour l'AG", () => {
    const ag: SignupNotification = {
      ...signup,
      kind: 'ag',
      phone: '',
      lines: [['Réponse', 'Pouvoir donné à Jean Dupont']],
    }
    const club = renderClubEmail(ag)
    const famille = renderFamilyEmail(ag)
    expect(club.subject).toBe('Réponse AG du 6 novembre : Léa Martin')
    expect(club.text).not.toContain('Téléphone')
    expect(famille.subject).toBe("Votre réponse pour l'AG du PKBA est bien reçue")
    expect(famille.text).toContain('Réponse : Pouvoir donné à Jean Dupont')
    expect(famille.html).toContain('https://pkba.vertiflow.fr/ag/')
    expect(famille.text).not.toContain('confirmer la place')
  })

  it("n'utilise ni tiret long ni tiret moyen", () => {
    for (const { html, text, subject } of rendus) {
      expect(`${subject}${html}${text}`).not.toMatch(/[\u2013\u2014]/)
    }
  })
})
