import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  { title: '모범택시', type: 'Series · Original Score', year: '2021', image: '/assets/posters/taxi-driver.jpg' },
  { title: '하이에나', type: 'Series · Original Score', year: '2020', image: '/assets/posters/hyena.jpg' },
  { title: '홍천기', type: 'Series · Original Score', year: '2021', image: '/assets/posters/lovers-of-the-red-sky.jpg' },
  { title: '화인가 스캔들', type: 'Series · Original Score', year: '2024', image: '/assets/posters/red-swan.png' },
  { title: '수색자', type: 'Film · Original Score', year: '2021', image: '/assets/posters/the-searcher.jpg' },
  { title: '모꼬지 키친', type: 'Series · Original Score', year: '2021', image: '/assets/posters/mokkoji-kitchen.jpg' },
  { title: '파트타임 멜로', type: 'Series · Original Score', year: '2021', image: '/assets/posters/part-time-melo.jpg' },
  { title: 'Crypto Conflict', type: 'Documentary · Original Score', year: '2025', image: '/assets/posters/crypto-conflict.jpg' },
]

function WorkPage() {
  return (
    <main className="work-page">
      <header className="work-nav">
        <a className="wordmark" href="/">DoubleY<span>®</span></a>
        <nav aria-label="주요 메뉴">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a className="active" href="/work.html">Work</a>
          <a href="/#services">Services</a>
          <a href="/#education">Education</a>
          <a href="/">Store</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="back-home" href="/">Back home ↗</a>
      </header>

      <section className="work-page-hero">
        <p>( Selected Work )</p>
        <h1>Stories,<br /><em>in sound.</em></h1>
        <div><span>Film · Series · Artist · Brand</span><span>2020 — 2025</span></div>
      </section>

      <section className="project-index" aria-label="전체 작업 목록">
        {projects.map((project, index) => (
          <article className="project-entry" key={project.title}>
            <div className="project-poster">
              <img src={project.image} alt={`${project.title} 포스터`} />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.type}</p>
              <span>{project.year}</span>
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
