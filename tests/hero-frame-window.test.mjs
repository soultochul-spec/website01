import assert from 'node:assert/strict'
import test from 'node:test'

test('keeps only the requested frame and its nearest neighbours in memory', async () => {
  const module = await import('../src/heroFrameWindow.js').catch(() => null)

  assert.notEqual(module, null, 'hero frame window module should exist')
  assert.deepEqual(module.getHeroFrameWindow(60, 120, 12), [60, 61, 59, 62, 58, 63, 57, 64, 56, 65, 55, 66])
  assert.deepEqual(module.getHeroFrameWindow(0, 120, 12), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
})

test('selects the lightweight mobile frame set on narrow screens', async () => {
  const module = await import('../src/heroFrameWindow.js').catch(() => null)

  assert.notEqual(module, null, 'hero frame window module should exist')
  assert.equal(module.getHeroFrameSrc(4, true), '/assets/hero-scroll-frames-mobile/frame-005.webp')
  assert.equal(module.getHeroFrameSrc(4, false), '/assets/hero-scroll-frames/frame-005.webp')
})
