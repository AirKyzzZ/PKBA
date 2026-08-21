import { chromium } from 'playwright-core'
import { execFileSync } from 'node:child_process'
import { readdirSync, mkdirSync, statSync, existsSync } from 'node:fs'
import { dirname, join, resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const SYSTEM = dirname(fileURLToPath(import.meta.url))
const FLYERS = dirname(SYSTEM)
const ROOT = dirname(FLYERS)

const MIN_ANY = 30
const MIN_SECONDARY = 44
const MIN_LARGE_FOR_BLUE = 66
const MAX_BYTES = 1_500_000

const slug = process.argv[2]
const target = process.argv[3] ?? 'all'

if (!slug) {
  const slugs = readdirSync(FLYERS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name)
  console.error('usage: node flyers/_system/render.mjs <slug> [instagram|print|all]')
  console.error('slugs :\n  ' + slugs.join('\n  '))
  process.exit(1)
}

const dir = join(FLYERS, slug)
if (!existsSync(dir)) {
  console.error(`introuvable: ${dir}`)
  process.exit(1)
}
mkdirSync(join(dir, 'exports'), { recursive: true })

execFileSync(
  'npx',
  ['tailwindcss', '-c', join(SYSTEM, 'tailwind.config.js'), '-i', join(SYSTEM, 'flyers.css'), '-o', join(SYSTEM, 'out.css'), '--minify'],
  { cwd: ROOT, stdio: ['ignore', 'ignore', 'pipe'] },
)

const browser = await chromium.launch({ channel: 'chrome' })
const problems = []

async function open(htmlPath) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 }, deviceScaleFactor: 1 })
  await page.goto(`file://${resolve(htmlPath)}`)
  await page.evaluate(() => document.fonts.ready)
  return page
}

async function autoFit(page, label) {
  const fit = await page.evaluate(() => {
    const zone = document.querySelector('.fit-zone')
    if (!zone) return { skipped: true }
    const over = () => Math.round(zone.scrollHeight - zone.clientHeight)
    const initial = over()
    let scale = 1
    while (over() > 0 && scale > 0.6) {
      scale = Math.round((scale - 0.01) * 100) / 100
      zone.style.zoom = String(scale)
    }
    return { initial, scale, remaining: over() }
  })
  if (fit.skipped) {
    problems.push(`${label} : pas de .fit-zone, le debordement n est pas surveille`)
    return
  }
  if (fit.initial > 60) {
    throw new Error(`${label} : debordement de ${fit.initial}px, trop pour l auto-fit. Alleger le contenu.`)
  }
  if (fit.initial > 0) console.log(`     auto-fit ${fit.initial}px corriges (zoom ${fit.scale})`)
}

async function audit(page, label) {
  const found = await page.evaluate(
    ({ MIN_ANY, MIN_LARGE_FOR_BLUE }) => {
      const lum = (hex) => {
        const [r, g, b] = hex.map((v) => {
          const s = v / 255
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const parse = (c) => (c.match(/\d+/g) ?? []).slice(0, 3).map(Number)
      const ratio = (a, b) => {
        const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
        return (l1 + 0.05) / (l2 + 0.05)
      }
      const bgOf = (el) => {
        let n = el
        while (n) {
          const c = getComputedStyle(n).backgroundColor
          if (c && !c.includes('rgba(0, 0, 0, 0)')) return parse(c)
          n = n.parentElement
        }
        return [244, 242, 231]
      }
      const out = []
      document.querySelectorAll('body *').forEach((el) => {
        const txt = Array.from(el.childNodes)
          .filter((n) => n.nodeType === 3)
          .map((n) => n.textContent.trim())
          .join('')
        if (!txt) return
        const cs = getComputedStyle(el)
        const size = parseFloat(cs.fontSize)
        const weight = parseInt(cs.fontWeight, 10) || 400
        const fg = parse(cs.color)
        const r = ratio(fg, bgOf(el))
        const sample = txt.slice(0, 26)
        if (size < MIN_ANY) out.push(`texte ${size.toFixed(0)}px sous le plancher de ${MIN_ANY}px : "${sample}"`)
        const needed = size >= MIN_LARGE_FOR_BLUE || (size >= 51 && weight >= 700) ? 3 : 4.5
        if (r < needed) {
          out.push(`contraste ${r.toFixed(2)}:1 insuffisant (il faut ${needed}) a ${size.toFixed(0)}px : "${sample}"`)
        }
      })
      return out
    },
    { MIN_ANY, MIN_LARGE_FOR_BLUE },
  )
  found.forEach((f) => problems.push(`${label} : ${f}`))
}

async function renderPng(htmlPath) {
  const label = basename(htmlPath)
  const page = await open(htmlPath)
  await autoFit(page, label)
  await audit(page, label)
  const out = join(dir, 'exports', basename(htmlPath, '.html') + '.jpg')
  await page.locator('.canvas').screenshot({ path: out, type: 'jpeg', quality: 88 })
  const bytes = statSync(out).size
  if (bytes > MAX_BYTES) problems.push(`${label} : ${(bytes / 1e6).toFixed(2)} Mo, au dessus de 1,5 Mo`)
  const box = await page.locator('.canvas').boundingBox()
  console.log(`  JPG  ${box.width}x${box.height}  ${(bytes / 1024).toFixed(0)} Ko  ${basename(out)}`)
  await page.close()
}

async function renderPdf(htmlPath) {
  const label = basename(htmlPath)
  const page = await open(htmlPath)
  await autoFit(page, label)
  const out = join(dir, 'exports', basename(htmlPath, '.html') + '.pdf')
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true })
  console.log(`  PDF        ${basename(out)}`)
  await page.close()
}

console.log(slug)
const files = readdirSync(dir).filter((f) => f.endsWith('.html'))

for (const f of files.filter((f) => f.startsWith('instagram'))) {
  if (target === 'instagram' || target === 'all') await renderPng(join(dir, f))
}
for (const f of files.filter((f) => f.startsWith('print'))) {
  if (target === 'print' || target === 'all') await renderPdf(join(dir, f))
}

await browser.close()

if (problems.length) {
  console.log('\n  CONTROLE : ' + problems.length + ' point(s) a corriger')
  problems.forEach((p) => console.log('   - ' + p))
  process.exitCode = 1
} else {
  console.log('\n  CONTROLE : tout passe (plancher 30px, contrastes WCAG, poids fichier)')
}
console.log(`  -> ${join(dir, 'exports')}`)
