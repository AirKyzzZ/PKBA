import { Resend } from 'resend'
import { CLUB } from '@/content/club'

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_ID = 'tblROAkRfEWJDbXUu'

const SITE_URL = 'https://pkba.vertiflow.fr'
const LOGO_URL = `${SITE_URL}/images/transparent_full.png`
const BRAND_BLUE = '#006AFF'
const CLUB_PHONE = '06 60 14 71 44'
const CLUB_PHONE_HREF = 'tel:+33660147144'
const FONT_STACK = '-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'

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

export type RenderedEmail = {
  subject: string
  html: string
  text: string
}

type Cta = { label: string; url: string }

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

const FAMILY_CTA: Record<SignupKind, Cta> = {
  preinscription: { label: 'Voir les horaires et tarifs', url: `${SITE_URL}/horaires/` },
  stage: { label: 'Voir les infos du stage', url: `${SITE_URL}/stage/` },
}

const filled = (lines: Array<[string, string]>) => lines.filter(([, v]) => v && v.trim() !== '')

const rowsHtml = (lines: Array<[string, string]>) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-family:${FONT_STACK};font-size:14px;line-height:20px">${filled(lines)
    .map(
      ([k, v]) =>
        `<tr><td valign="top" style="padding:8px 16px 8px 0;border-bottom:1px solid #eef0f3;color:#6a675e;white-space:nowrap">${esc(k)}</td><td valign="top" style="padding:8px 0;border-bottom:1px solid #eef0f3;color:#0a0a0a;font-weight:600">${esc(v)}</td></tr>`,
    )
    .join('')}</table>`

const rowsText = (lines: Array<[string, string]>) =>
  filled(lines)
    .map(([k, v]) => `${k} : ${v}`)
    .join('\n')

const paragraphHtml = (text: string) =>
  `<p style="margin:0 0 16px;font-family:${FONT_STACK};font-size:15px;line-height:24px;color:#0a0a0a">${text}</p>`

const buttonHtml = (cta: Cta) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0"><tr><td bgcolor="${BRAND_BLUE}" style="border-radius:6px;background:${BRAND_BLUE}"><a href="${esc(cta.url)}" target="_blank" style="display:inline-block;padding:12px 22px;font-family:${FONT_STACK};font-size:15px;font-weight:600;line-height:20px;color:#ffffff;text-decoration:none;border-radius:6px">${esc(cta.label)}</a></td></tr></table>`

const layoutHtml = (preheader: string, title: string, body: string) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:#f3f4f6">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3f4f6" style="background:#f3f4f6">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb">
<tr><td style="padding:24px 32px 20px"><a href="${SITE_URL}" target="_blank"><img src="${LOGO_URL}" width="120" alt="PKBA" style="display:block;width:120px;height:auto;border:0;outline:none;text-decoration:none"></a></td></tr>
<tr><td height="4" bgcolor="${BRAND_BLUE}" style="height:4px;line-height:4px;font-size:4px;background:${BRAND_BLUE}">&nbsp;</td></tr>
<tr><td style="padding:28px 32px 32px">
<h1 style="margin:0 0 20px;font-family:${FONT_STACK};font-size:20px;line-height:28px;font-weight:700;color:#0a0a0a">${esc(title)}</h1>
${body}
</td></tr>
<tr><td bgcolor="#f9fafb" style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 12px 12px;font-family:${FONT_STACK};font-size:13px;line-height:20px;color:#6a675e">
<strong style="color:#0a0a0a">${esc(CLUB.name)}</strong><br>
${esc(CLUB.address.full)}<br>
<a href="${CLUB_PHONE_HREF}" style="color:${BRAND_BLUE};text-decoration:none">${CLUB_PHONE}</a> (David)<br>
<a href="${SITE_URL}" target="_blank" style="color:${BRAND_BLUE};text-decoration:none">pkba.vertiflow.fr</a> · <a href="${esc(CLUB.social.instagram)}" target="_blank" style="color:${BRAND_BLUE};text-decoration:none">Instagram @${esc(CLUB.social.instagramHandle)}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

const footerText = () =>
  [
    CLUB.name,
    CLUB.address.full,
    `${CLUB_PHONE} (David)`,
    SITE_URL,
    `Instagram : ${CLUB.social.instagram}`,
  ].join('\n')

export function renderClubEmail(n: SignupNotification): RenderedEmail {
  const fullName = `${n.firstName} ${n.lastName}`
  const subject = `${LABEL[n.kind]} : ${fullName}`
  const lines: Array<[string, string]> = [
    ['Nom', fullName],
    ['Email', n.email],
    ['Téléphone', n.phone],
    ...n.lines,
  ]
  const url = recordUrl(n.recordId)
  const replyHint = 'Répondre à ce mail écrit directement à la famille.'

  const html = layoutHtml(
    subject,
    subject,
    `${rowsHtml(lines)}
${url ? buttonHtml({ label: 'Ouvrir la fiche Airtable', url }) : ''}
<p style="margin:20px 0 0;font-family:${FONT_STACK};font-size:13px;line-height:20px;color:#6a675e">${replyHint}</p>`,
  )

  const text = [
    subject,
    '',
    rowsText(lines),
    ...(url ? ['', `Ouvrir la fiche Airtable : ${url}`] : []),
    '',
    replyHint,
    '',
    footerText(),
  ].join('\n')

  return { subject, html, text }
}

export function renderFamilyEmail(n: SignupNotification): RenderedEmail {
  const subject = 'Votre demande au PKBA est bien reçue'
  const title = 'Bien reçu, merci'
  const intro =
    n.kind === 'stage'
      ? 'Votre inscription au stage est bien enregistrée.'
      : 'Votre préinscription est bien enregistrée.'
  const followUp = 'On revient vers vous rapidement pour confirmer la place et finaliser le dossier.'
  const question = `Une question d'ici là, appelez David au ${CLUB_PHONE}.`
  const lines: Array<[string, string]> = [['Nom', `${n.firstName} ${n.lastName}`], ...n.lines]
  const cta = FAMILY_CTA[n.kind]

  const html = layoutHtml(
    intro,
    title,
    `${paragraphHtml(`Bonjour,<br><br>${esc(intro)} ${esc(followUp)}`)}
${rowsHtml(lines)}
${buttonHtml(cta)}
<p style="margin:24px 0 0;font-family:${FONT_STACK};font-size:15px;line-height:24px;color:#0a0a0a">Une question d'ici là, appelez David au <a href="${CLUB_PHONE_HREF}" style="color:${BRAND_BLUE};text-decoration:none;font-weight:600;white-space:nowrap">${CLUB_PHONE}</a>.</p>`,
  )

  const text = [
    title,
    '',
    'Bonjour,',
    '',
    `${intro} ${followUp}`,
    '',
    rowsText(lines),
    '',
    `${cta.label} : ${cta.url}`,
    '',
    question,
    '',
    footerText(),
  ].join('\n')

  return { subject, html, text }
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

  const send = async (to: string, replyTo: string, email: RenderedEmail) => {
    try {
      const { error } = await resend.emails.send({
        from: sender,
        to,
        replyTo,
        subject: email.subject,
        html: email.html,
        text: email.text,
      })
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
    send(CLUB_INBOX, n.email, renderClubEmail(n)),
    send(n.email, CLUB_INBOX, renderFamilyEmail(n)),
  ])

  return { club, family }
}
