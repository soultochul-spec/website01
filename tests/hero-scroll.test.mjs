import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const main = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')

test('hero uses a 120-frame WebP scroll canvas', () => {
  assert.match(main, /HERO_FRAME_COUNT = 120/)
  assert.match(main, /className="hero-canvas"/)
  assert.match(main, /hero-scroll-frames\/frame-/)
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
