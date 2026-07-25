import { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { Layout } from './components/Layout'
import { gallery, notices } from './data/site'
import { imageUrl } from './lib/assets'

const slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg']

function HomePage() {
  const [slide, setSlide] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setSlide(value => (value + 1) % slides.length), 5000); return () => window.clearInterval(timer) }, [])
  return <>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,30,83,.72), rgba(8,30,83,.12)), url(${imageUrl(slides[slide])})` }}>
      <div className="hero-content"><p>시민과 함께하는</p><h1>안전한 대전,<br />든든한 대전경찰</h1><button onClick={() => setSlide((slide + 1) % slides.length)} aria-label="다음 슬라이드">→</button></div>
    </section>
    <section className="quick-section"><h2>자주 찾는 서비스</h2><div className="quick-grid">{['민원신청', '교통정보', '분실물 조회', '범죄 신고', '공개수배'].map((label, index) => <button key={label}><strong>0{index + 1}</strong>{label}</button>)}</div></section>
    <section className="content-grid"><article className="notice-card"><div className="section-heading"><h2>알림마당</h2><button>더보기 +</button></div><ul>{notices.map(([date, title]) => <li key={title}><span>{title}</span><time>{date}</time></li>)}</ul></article><article className="history-card"><p>DAEJEON POLICE</p><h2>대전경찰 역사관</h2><span>대전경찰의 발자취를 만나보세요.</span><Link to="/history">역사관 둘러보기 →</Link></article></section>
    <section className="news-section"><div className="section-heading"><h2>대전경찰은 지금</h2><button>더보기 +</button></div><div className="news-grid">{['new1.jpg', 'new2.jpg', 'new3.jpg'].map((image, index) => <article key={image}><img src={imageUrl(image)} alt="대전경찰 활동" /><h3>시민의 일상을 지키는 대전경찰 이야기</h3><p>2025.01.{15 - index}</p></article>)}</div></section>
  </>
}

function HistoryPage() {
  const [year, setYear] = useState(2018)
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null)
  return <section className="history-page"><div className="page-title"><p><Link to="/">Home</Link> / 대전경찰소개 / 역사관</p><h1>대전경찰 역사관</h1></div><div className="year-picker"><button onClick={() => setYear(year - 1)}>←</button><strong>{year}</strong><button onClick={() => setYear(year + 1)}>→</button></div><div className="gallery-grid">{gallery.map(item => <button key={item.id} className="gallery-item" onClick={() => setSelected(item)}><img src={imageUrl(item.image)} alt={item.title} /><span>{item.title}</span></button>)}</div>{selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={event => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="닫기">×</button><img src={imageUrl(selected.image)} alt={selected.title} /><h2>{selected.title}</h2><p>{year}년 대전경찰의 주요 활동을 소개합니다.</p></article></div>}</section>
}

export default function App() { return <Layout><Routes><Route path="/" element={<HomePage />} /><Route path="/history" element={<HistoryPage />} /><Route path="*" element={<HomePage />} /></Routes></Layout> }
