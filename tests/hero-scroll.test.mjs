import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const main = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')

test('hero uses a 120-frame WebP scroll canvas', () => {
  const desktopFrames = readdirSync(new URL('../public/assets/hero-scroll-frames/', import.meta.url)).filter((file) => file.endsWith('.webp'))
  const mobileFrames = readdirSync(new URL('../public/assets/hero-scroll-frames-mobile/', import.meta.url)).filter((file) => file.endsWith('.webp'))

  assert.match(main, /HERO_FRAME_COUNT = 120/)
  assert.match(main, /className="hero-canvas"/)
  assert.equal(desktopFrames.length, 120)
  assert.equal(mobileFrames.length, 120)
})

test('hero stage remains pinned while the frame sequence advances', () => {
  assert.match(main, /className="hero-stage"/)
  assert.match(styles, /\.hero-stage\s*\{[^}]*position:sticky/)
  assert.match(styles, /\.hero\s*\{[^}]*min-height:300svh/)
})

test('main navigation stays dark without changing the work navigation', () => {
  assert.match(styles, /\.nav\s*\{[^}]*background:rgba\(0,0,0,\.92\)/)
  assert.match(styles, /\.nav--solid\s*\{[^}]*color:white[^}]*background:rgba\(0,0,0,\.92\)/)
  assert.match(styles, /\.work-nav\s*\{[^}]*background:rgba\(241,240,234,\.94\)/)
})

test('about uses the string quartet image with a left-side readability gradient', () => {
  assert.equal(existsSync(new URL('../public/assets/about-string-quartet.png', import.meta.url)), true)
  assert.match(styles, /url\('\/assets\/about-string-quartet\.png'\)/)
  assert.match(styles, /linear-gradient\(90deg,rgba\(0,0,0,\.88\)/)
  assert.match(styles, /background-position:60% center/)
})

test('about copy pauses longer after each sentence and adds space after the second sentence', () => {
  assert.match(styles, /\.about-copy p span:nth-child\(2\)\s*\{[^}]*margin-bottom:\.775em/)
  assert.match(styles, /span:nth-child\(1\)[^{]*\{[^}]*2\.12s forwards/)
  assert.match(styles, /span:nth-child\(2\)[^{]*\{[^}]*3\.32s forwards/)
  assert.match(styles, /span:nth-child\(3\)[^{]*\{[^}]*4\.52s forwards/)
})
