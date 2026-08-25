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

test('education omits the mentoring-year labels and counter', () => {
  assert.doesNotMatch(main, /15 years of mentoring/i)
  assert.doesNotMatch(main, /Years<br \/>teaching/)
  assert.doesNotMatch(main, /className="education-years"/)
})

test('education presents its remaining copy sequentially over a monochrome blurred image', () => {
  assert.doesNotMatch(main, /정답을 가르치기보다/)
  assert.match(main, /className="education-visual"/)
  assert.match(main, /className="education-blur"/)
  assert.match(main, /className="education-overlay"/)
  assert.match(styles, /\.education-visual img\s*\{[^}]*filter:grayscale\(1\)/)
  assert.match(styles, /\.education-blur\s*\{[^}]*backdrop-filter:blur/)
  assert.match(styles, /\.education--visible \.education-overlay h2\s*\{[^}]*animation:/)
  assert.match(styles, /\.education--visible \.education-lead\s*\{[^}]*animation:[^}]*\.6s forwards/)
  assert.match(styles, /\.education--visible \.education-body p:nth-child\(1\)\s*\{[^}]*animation:[^}]*1\.2s forwards/)
  assert.match(styles, /\.education--visible \.education-body p:nth-child\(2\)\s*\{[^}]*animation:[^}]*1\.8s forwards/)
})

test('education uses the selected Korean headline and larger supporting copy', () => {
  assert.match(main, /당신의 감각을, <em>음악의 언어로\.<\/em>/)
  assert.match(main, /className="education-lead">당신만의 소리가 선명해지도록\.<\/p>/)
  assert.match(styles, /\.education-link\s*\{[^}]*font-size:15\.6px/)
})

test('education lead sits below the headline and body copy stays at the lower left', () => {
  assert.match(styles, /\.education-lead\s*\{[^}]*margin:18px 0 0/)
  assert.match(styles, /\.education-body\s*\{[^}]*margin:auto 0 6% 0/)
})

test('education includes the refined career copy at a larger size', () => {
  assert.match(main, /15년간 수많은 음악가가 자신의 감각을 실제 작업 역량으로 발전시키는 과정을 함께했습니다\./)
  assert.match(main, /영화, 드라마, 게임, 뮤지컬 등 다양한 콘텐츠 음악 현장에서 전문적으로 활동하며 저마다의 음악적 여정을 이어가고 있습니다\./)
  assert.match(styles, /\.education-body p\s*\{[^}]*font-size:19\.32px/)
  assert.match(styles, /\.education-body p\s*\{[^}]*font-size:16\.56px/)
})

test('education offsets the lead down and both body paragraphs up by two lines', () => {
  assert.match(styles, /\.education-lead\s*\{[^}]*translate:0 10%/)
  assert.match(styles, /\.education-body p\s*\{[^}]*translate:0 -3\.6em/)
  assert.doesNotMatch(styles, /\.education-body p:nth-child\(1\)\s*\{[^}]*translate:/)
})
