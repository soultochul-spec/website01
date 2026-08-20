import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  { title: '모범택시', artist: '윤도현', track: '귀로', role: 'Strings Arrangement', image: '/assets/posters/taxi-driver.jpg' },
  { title: '하이에나', artist: '신지훈', track: 'Far Away', role: 'Strings Arrangement', image: '/assets/posters/hyena.jpg' },
  { title: '홍천기', artist: '정효빈', track: '달과 별의 밤', role: 'Strings Arrangement', image: '/assets/posters/lovers-of-the-red-sky.jpg' },
  { title: '수색자', artist: '박기철', track: 'Prologue 외', role: 'Composer / Arranger', image: '/assets/posters/the-searcher.jpg' },
  { title: '화인가스캔들', artist: '박기철', track: 'Title 외 다수', role: 'Composer / Arranger', image: '/assets/posters/red-swan.png' },
  { title: '모꼬지키친', artist: '박기철', track: '다수 Scores', role: 'Composer / Arranger', image: '/assets/posters/mokkoji-kitchen.jpg' },
  { title: '파트타임멜로', artist: '박기철', track: '다수 Scores', role: 'Composer / Arranger', image: '/assets/posters/part-time-melo.jpg' },
  { title: 'Cryoti Conflict', artist: '박기철', track: '게임 Score', role: 'Composer / Arranger', image: '/assets/posters/crypto-conflict.jpg' },
]

function WorkPage() {
  return (
    <main className="work-page">
      <header className="work-nav">
        <a className="wordmark" href="/index.html#top">DoubleY<span>®</span></a>
        <nav aria-label="주요 메뉴">
          <a href="/index.html#top">Home</a>
          <a href="/index.html#about">About</a>
          <a className="active" href="/work.html">Work</a>
          <a href="/index.html#services">Services</a>
          <a href="/index.html#education">Education</a>
          <a href="/index.html#top">Store</a>
          <a href="/index.html#contact">Contact</a>
        </nav>
        <a className="back-home" href="/index.html#top">Back home ↗</a>
      </header>

      <section className="work-page-hero">
        <h1>Stories, <em>in sound.</em></h1>
        <div><span>Film · Series · Artist · Brand</span><span>2020 — 2025</span></div>
      </section>

      <section className="project-index" aria-label="전체 작업 목록">
        {projects.map((project) => (
          <article className="project-entry" key={project.title}>
            <div className="project-poster">
              <img src={project.image} alt={`${project.title} 포스터`} />
            </div>
            <div className="project-info">
              <div className="project-title-block">
                <dl className="project-credits">
                  <div><dt>Artist</dt><dd>{project.artist}</dd></div>
                  <div><dt>곡명</dt><dd>{project.track}</dd></div>
                  <div><dt>참여부문</dt><dd>{project.role}</dd></div>
                </dl>
              </div>
              <div className="project-links" aria-label={`${project.title} 외부 링크 영역`}>
                <div><span>YouTube</span><b>Link to be added</b></div>
                <div><span>Streaming</span><b>Link to be added</b></div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="work-footer">
        <p>Have a story to tell?</p>
        <a href="mailto:hello@doubley.com">Let’s work together ↗</a>
        <div><span>© 2026 DoubleY · Font provided by 11번가㈜</span><a href="/">Back to home</a></div>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><WorkPage /></React.StrictMode>)
