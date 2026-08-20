import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const services = [
  ['01', 'Film & Series Score', '화면의 감정과 호흡을 따라가는 오리지널 스코어'],
  ['02', 'Songwriting & Production', '아티스트의 목소리를 선명하게 만드는 곡과 프로덕션'],
  ['03', 'Arrangement & Orchestration', '작은 모티프를 풍성한 음악적 장면으로 확장하는 편곡'],
  ['04', 'Commercial & Brand Sound', '짧지만 오래 기억되는 브랜드의 사운드 아이덴티티'],
]

const posters = [
  ['/assets/posters/taxi-driver.jpg', '모범택시'],
  ['/assets/posters/hyena.jpg', '하이에나'],
  ['/assets/posters/lovers-of-the-red-sky.jpg', '홍천기'],
  ['/assets/posters/red-swan.png', '화인가 스캔들'],
  ['/assets/posters/the-searcher.jpg', '수색자'],
  ['/assets/posters/mokkoji-kitchen.jpg', '모꼬지 키친'],
  ['/assets/posters/part-time-melo.jpg', '파트타임 멜로'],
  ['/assets/posters/crypto-conflict.jpg', 'Crypto Conflict'],
]

const tracks = [
  'Comic 1 - Pull and Push.mp3', 'DatDat.mp3', 'Final Fight.mp3',
  'Heart Fluttered.mp3', 'Investigation.mp3', 'Jungle - Comic 2.mp3',
  'Mystery.mp3', 'Prologue.mp3', 'Something.mp3', 'Tension Strings.mp3',
  'Tension.mp3', 'Tension_Action 1.mp3', 'Tension_Action 2.mp3',
  'Title.mp3', 'Waltz for Science Clock.mp3',
].map((file) => ({ file, title: file.replace(/\.mp3$/i, '') }))

const shuffled = (items) => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const faqs = [
  ['어떤 프로젝트를 맡나요?', '영화와 시리즈, 아티스트 음반, 광고 및 브랜드 사운드를 중심으로 작업합니다. 프로젝트의 규모보다 음악이 맡아야 할 역할을 먼저 봅니다.'],
  ['보통 제작 기간은 얼마나 걸리나요?', '곡의 수, 러닝타임, 편성에 따라 달라집니다. 브리프를 받은 뒤 현실적인 일정과 마일스톤을 먼저 제안합니다.'],
  ['비용은 어떻게 산정하나요?', '작업 범위, 납기, 사용 매체와 라이선스 범위를 확인한 뒤 프로젝트별로 안내합니다.'],
  ['납품 파일에는 무엇이 포함되나요?', '최종 믹스와 인스트루멘털, 스템 등 합의한 포맷으로 정리해 전달합니다.'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [trackIndex, setTrackIndex] = useState(-1)
  const [elapsed, setElapsed] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const audioRef = useRef(null)
  const playlistRef = useRef([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const playTrack = (index) => {
    const next = playlistRef.current[index]
    const audio = audioRef.current
    audio.src = `/music/${encodeURIComponent(next.file)}`
    audio.currentTime = 0
    setCurrentTrack(next)
    setTrackIndex(index)
    setElapsed(0)
    setPlayerOpen(true)
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  const playRandom = () => {
    if (!playlistRef.current.length) playlistRef.current = shuffled(tracks)
    let nextIndex = Math.floor(Math.random() * playlistRef.current.length)
    if (nextIndex === trackIndex) nextIndex = (nextIndex + 1) % playlistRef.current.length
    playTrack(nextIndex)
  }

  const skipTrack = (direction) => {
    if (!playlistRef.current.length) playlistRef.current = shuffled(tracks)
    const nextIndex = (trackIndex + direction + playlistRef.current.length) % playlistRef.current.length
    playTrack(nextIndex)
  }

  const togglePlayback = () => {
    const audio = audioRef.current
    if (audio.paused) audio.play().then(() => setPlaying(true))
    else { audio.pause(); setPlaying(false) }
  }

  const closePlayer = () => {
    audioRef.current.pause()
    setPlaying(false)
    setPlayerOpen(false)
  }

  const updatePlayback = () => {
    const time = Math.min(audioRef.current.currentTime, 50)
    setElapsed(time)
    if (time >= 50) {
      audioRef.current.pause()
      setPlaying(false)
    }
  }

  const formatTime = (seconds) => `0:${String(Math.floor(seconds)).padStart(2, '0')}`

  return (
    <main>
      <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <button className="wordmark" onClick={() => go('#top')} aria-label="맨 위로">DoubleY<span>®</span></button>
        <nav className={menuOpen ? 'navlinks navlinks--open' : 'navlinks'} aria-label="주요 메뉴">
          <button onClick={() => go('#top')}>Home</button>
          <button onClick={() => go('#about')}>About</button>
          <button onClick={() => { window.location.href = '/work.html' }}>Work</button>
          <button onClick={() => go('#services')}>Services</button>
          <button onClick={() => go('#education')}>Education</button>
          <button>Store</button>
          <button onClick={() => go('#contact')}>Contact</button>
        </nav>
        <button className="nav-cta" onClick={playRandom}><span className="play-dot">▶</span> Play reel</button>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="메뉴 열기">{menuOpen ? 'Close' : 'Menu'}</button>
      </header>

      <section className="hero" id="top">
        <img src="/assets/composer-hero.png" alt="새벽빛이 드는 스튜디오에서 피아노를 연주하는 작곡가" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Composer · Producer · Seoul</p>
          <h1>Music for<br />stories <em>felt.</em></h1>
          <div className="hero-bottom">
            <p>화면 너머에 오래 남는 감정을<br />음악으로 설계합니다.</p>
            <div className="hero-actions">
              <button className="button button--light" onClick={playRandom}>Play Reel <span>▶</span></button>
            </div>
          </div>
        </div>
        <p className="scroll-cue">Scroll to discover <span>↓</span></p>
      </section>

      <section className="about section" id="about">
        <div className="section-label"><span>( About )</span><span>Based in Seoul · Working worldwide</span></div>
        <h2>Every story has a frequency.</h2>
        <div className="about-grid">
          <div className="portrait" role="img" aria-label="피아노 건반과 악보가 놓인 작곡 스튜디오" />
          <div className="about-copy">
            <p>영화, 드라마, 음반과 브랜드를 위한 음악을 만듭니다. 장면의 온도와 인물의 숨, 말 사이의 침묵까지 듣고 꼭 필요한 소리만 남깁니다.</p>
            <button className="round-link">My story <Arrow /></button>
          </div>
        </div>
        <div className="poster-reel" aria-label="참여 작품 포스터">
          <div className="poster-track">
            {[...posters, ...posters].map(([src, title], index) => (
              <figure key={`${title}-${index}`} aria-hidden={index >= posters.length ? 'true' : undefined}>
                <img src={src} alt={index < posters.length ? `${title} 포스터` : ''} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="numbers">
        <div><strong>40<sup>+</sup></strong><span>Released works</span></div>
        <div><strong>12<sup>M</sup></strong><span>Global streams</span></div>
        <div><strong>08</strong><span>Years creating</span></div>
        <div><strong>06</strong><span>Awards & selections</span></div>
      </section>

      <section className="services section dark" id="services">
        <div className="section-label"><span>( Services )</span><span>What I do</span></div>
        <h2>From first note<br />to final <em>mix.</em></h2>
        <div className="service-list">
          {services.map(([no, title, desc]) => (
            <article key={no} tabIndex="0">
              <span>{no}</span><h3>{title}</h3><p>{desc}</p><Arrow />
            </article>
          ))}
        </div>
      </section>

      <section className="education section dark" id="education">
        <div className="section-label"><span>( Education )</span><span>15 years of mentoring</span></div>
        <div className="education-heading">
          <h2>Technique serves<br />your <em>instinct.</em></h2>
          <div className="education-years"><strong>15</strong><span>Years<br />teaching</span></div>
        </div>
        <div className="education-image">
          <img src="/assets/education-mentoring.png" alt="스튜디오에서 악보를 함께 살펴보며 진행하는 일대일 작곡 교육" />
        </div>
        <div className="education-copy">
          <p className="education-lead">정답을 가르치기보다,<br />당신만의 소리가 선명해지도록.</p>
          <div>
            <p>15년 동안 수많은 음악가의 시작과 성장을 함께했습니다. 이미 지닌 감각을 섬세하게 읽고, 막연했던 영감을 자신 있게 완성할 수 있는 역량으로 연결합니다.</p>
            <p>기술은 표현을 가두는 규칙이 아니라 가능성을 넓히는 도구여야 합니다. 각자의 속도와 언어를 존중하며, 다른 누구도 아닌 자신의 음악에 가까워지는 시간을 만듭니다.</p>
            <button className="education-link">Explore education <Arrow /></button>
          </div>
        </div>
      </section>

      <section className="quote">
        <p>“The music didn’t just support the scene.<br />It revealed what the characters<br />couldn’t say.”</p>
        <span>— Min Lee, Film Director</span>
      </section>

      <section className="faq section">
        <div className="section-label"><span>( FAQ )</span><span>Before we begin</span></div>
        <h2>Good questions,<br /><em>clear answers.</em></h2>
        <div className="faq-list">
          {faqs.map(([q, a], i) => <div className="faq-item" key={q}>
            <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
              <span>0{i + 1}</span><b>{q}</b><i>{openFaq === i ? '−' : '+'}</i>
            </button>
            <div className={openFaq === i ? 'faq-answer faq-answer--open' : 'faq-answer'}><p>{a}</p></div>
          </div>)}
        </div>
      </section>

      <footer id="contact">
        <p className="eyebrow">Have a project in mind?</p>
        <h2>Let’s make something<br />worth <em>hearing.</em></h2>
        <a className="button button--dark" href="mailto:hello@doubley.com">Start a project <Arrow /></a>
        <div className="footer-bottom">
          <span>© 2026 DoubleY</span><a href="mailto:hello@doubley.com">hello@doubley.com</a>
          <div><a href="#instagram">Instagram</a><a href="#spotify">Spotify</a><a href="#youtube">YouTube</a></div>
          <small>Font provided by 11번가㈜</small>
        </div>
      </footer>

      <audio ref={audioRef} onTimeUpdate={updatePlayback} onEnded={() => setPlaying(false)} />
      {playerOpen && <div className="player" role="region" aria-label="음악 미리듣기 플레이어">
        <div className="player-controls">
          <button onClick={() => skipTrack(-1)} aria-label="이전 트랙">│◀</button>
          <button className="player-pause" onClick={togglePlayback} aria-label={playing ? '일시정지' : '재생'}>{playing ? 'Ⅱ' : '▶'}</button>
          <button onClick={() => skipTrack(1)} aria-label="다음 트랙">▶│</button>
        </div>
        <div><b>{currentTrack?.title}</b><span>Random preview · 50 sec</span></div>
        <span className="time">{formatTime(elapsed)}</span><div className="progress"><i style={{ width: `${(elapsed / 50) * 100}%` }} /></div><span className="time">0:50</span>
        <button className="player-close" onClick={closePlayer} aria-label="플레이어 닫기">×</button>
      </div>}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
