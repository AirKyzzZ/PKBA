import { Resend } from 'resend'
import { CLUB } from '@/content/club'

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_ID = 'tblROAkRfEWJDbXUu'

export const CLUB_INBOX = 'parkourBA33@gmail.com'

export type SignupKind = 'preinscription' | 'stage'

export type SignupNotification = {
  kind: SignupKind
  recordId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  lines: Array<[string, string]>
}

export type NotifyOutcome = {
  club: 'sent' | 'failed' | 'skipped'
  family: 'sent' | 'failed' | 'skipped'
}

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const recordUrl = (recordId: string) =>
  AIRTABLE_BASE_ID
    ? `https://airtable.com/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${recordId}`
    : null

const LABEL: Record<SignupKind, string> = {
  preinscription: 'Préinscription saison 2026/2027',
  stage: 'Inscription au stage',
}

const shell = (title: string, body: string) => `
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a;max-width:560px">
  <p style="font-size:18px;font-weight:700;margin:0 0 16px">${esc(title)}</p>
  ${body}
  <p style="margin-top:28px;font-size:13px;color:#6a675e">
    PKBA, ${esc(CLUB.address.full)}<br>
    <a href="https://pkba.vertiflow.fr" style="color:#006AFF">pkba.vertiflow.fr</a>
  </p>
</div>`

const rows = (lines: Array<[string, string]>) =>
  `<table style="border-collapse:collapse;font-size:14px">${lines
    .filter(([, v]) => v && v.trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6a675e;vertical-align:top">${esc(k)}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join('')}</table>`

function clubEmail(n: SignupNotification): string {
  const url = recordUrl(n.recordId)
  return shell(
    `${LABEL[n.kind]} : ${n.firstName} ${n.lastName}`,
    `${rows([['Nom', `${n.firstName} ${n.lastName}`], ['Email', n.email], ['Téléphone', n.phone], ...n.lines])}
     ${url ? `<p style="margin-top:20px"><a href="${url}" style="background:#006AFF;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;display:inline-block;font-weight:600">Ouvrir la fiche Airtable</a></p>` : ''}`,
  )
}

function familyEmail(n: SignupNotification): string {
  const intro =
    n.kind === 'stage'
      ? 'Votre inscription au stage est bien enregistrée.'
      : 'Votre préinscription est bien enregistrée.'
  return shell(
    'Bien reçu, merci',
    `<p style="font-size:15px;line-height:1.6;margin:0 0 16px">Bonjour,<br><br>${esc(intro)} On revient vers vous rapidement pour confirmer la place et finaliser le dossier.</p>
     ${rows([['Nom', `${n.firstName} ${n.lastName}`], ...n.lines])}
     <p style="font-size:15px;line-height:1.6;margin:20px 0 0">Une question d'ici là, appelez David au 06 60 14 71 44.</p>`,
  )
}

export async function notifySignup(n: SignupNotification): Promise<NotifyOutcome> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !from) {
    console.error(
      `[notifications] RESEND_API_KEY ou RESEND_FROM_EMAIL manquant, aucun mail envoye pour ${n.recordId}`,
    )
    return { club: 'skipped', family: 'skipped' }
  }

  const resend = new Resend(apiKey)
  const sender = `PKBA <${from}>`

  const send = async (to: string, subject: string, html: string) => {
    try {
      const { error } = await resend.emails.send({ from: sender, to, subject, html })
      if (error) {
        console.error(`[notifications] echec envoi a ${to} pour ${n.recordId}`, error)
        return 'failed' as const
      }
      return 'sent' as const
    } catch (err) {
      console.error(`[notifications] exception envoi a ${to} pour ${n.recordId}`, err)
      return 'failed' as const
    }
  }

  const [club, family] = await Promise.all([
    send(CLUB_INBOX, `${LABEL[n.kind]} : ${n.firstName} ${n.lastName}`, clubEmail(n)),
    send(n.email, 'Votre demande au PKBA est bien reçue', familyEmail(n)),
  ])

  return { club, family }
}
