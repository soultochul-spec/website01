export const getHeroFrameWindow = (requestedFrame, frameCount, cacheLimit) => {
  const indices = []

  for (let distance = 0; indices.length < cacheLimit && distance < frameCount; distance += 1) {
    const next = requestedFrame + distance
    const previous = requestedFrame - distance

    if (next < frameCount) indices.push(next)
    if (distance > 0 && indices.length < cacheLimit && previous >= 0) indices.push(previous)
  }

  return indices
}

export const getHeroFrameSrc = (index, mobile) => {
  const folder = mobile ? 'hero-scroll-frames-mobile' : 'hero-scroll-frames'
  return `/assets/${folder}/frame-${String(index + 1).padStart(3, '0')}.webp`
}
