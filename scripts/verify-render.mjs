import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const targetUrl = process.env.APP_URL ?? 'http://127.0.0.1:5173/'
const outputDir = 'tmp/render-checks'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch()
const results = []

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport })
  const messages = []

  page.on('console', (message) => {
    messages.push(`${message.type()}: ${message.text()}`)
  })

  page.on('pageerror', (error) => {
    messages.push(`pageerror: ${error.message}`)
  })

  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${outputDir}/${viewport.name}-home.png`, fullPage: true })

  await page.getByRole('button', { name: /lihat detail/i }).click()
  await page.waitForURL('**/game/dino-meteor-dodge')
  await page.screenshot({ path: `${outputDir}/${viewport.name}-detail.png`, fullPage: true })

  await page.getByRole('button', { name: /mulai/i }).click()
  await page.waitForSelector('canvas')
  await page.waitForTimeout(1200)

  const screenshot = `${outputDir}/${viewport.name}-game.png`
  const canvas = page.locator('canvas')
  const imageBuffer = await canvas.screenshot({ path: screenshot })
  const imageDataUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`

  const sample = await page.evaluate(async (src) => {
    const image = new Image()
    image.src = src
    await image.decode()

    const scratch = document.createElement('canvas')
    scratch.width = image.naturalWidth
    scratch.height = image.naturalHeight

    const context = scratch.getContext('2d')
    if (!context) {
      return { ok: false, reason: '2d context not found' }
    }

    context.drawImage(image, 0, 0)

    const colors = new Set()
    let brightSamples = 0

    for (let row = 1; row < 8; row += 1) {
      for (let col = 1; col < 8; col += 1) {
        const x = Math.floor((scratch.width * col) / 8)
        const y = Math.floor((scratch.height * row) / 8)
        const [r, g, b, a] = context.getImageData(x, y, 1, 1).data
        colors.add(`${r},${g},${b},${a}`)

        if (r + g + b > 95) {
          brightSamples += 1
        }
      }
    }

    return {
      ok: colors.size > 2 && brightSamples > 0,
      width: scratch.width,
      height: scratch.height,
      uniqueColors: colors.size,
      brightSamples,
    }
  }, imageDataUrl)

  results.push({ ...viewport, screenshot, sample, messages })
  await page.close()
}

await browser.close()

for (const result of results) {
  console.log(
    `${result.name}: ${result.sample.ok ? 'ok' : 'failed'} ` +
      `(${result.sample.width}x${result.sample.height}, ` +
      `${result.sample.uniqueColors} colors, ${result.sample.brightSamples} bright samples) ` +
      result.screenshot,
  )

  for (const message of result.messages) {
    console.log(`  ${message}`)
  }
}

if (results.some((result) => !result.sample.ok)) {
  process.exitCode = 1
}
