import { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { Layout } from './components/Layout'
import { gallery, news, noticeTabs, partnerImages, quickLinks, quickServices } from './data/site'
import { imageUrl } from './lib/assets'

const slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg']

function HomePage() {
  const [slide, setSlide] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setSlide(value => (value + 1) % slides.length), 5000); return () => window.clearInterval(timer) }, [])
  return <>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,30,83,.72), rgba(8,30,83,.12)), url(${imageUrl(slides[slide])})` }}>
      <div className="hero-content"><p>시민과 함께하는</p><h1>안전한 대전,<br />든든한 대전경찰</h1><button onClick={() => setSlide((slide + 1) % slides.length)} aria-label="다음 슬라이드">→</button></div>
    </section>
    <section className="quick-section"><h2>자주 찾는 서비스</h2><div className="quick-grid">{quickServices.map((label, index) => <button key={label}><strong>0{index + 1}</strong>{label}</button>)}</div></section>
    <section className="content-grid"><article className="notice-card"><div className="notice-tabs" role="tablist">{noticeTabs.map((tab, index) => <button key={tab.label} role="tab" aria-selected={activeTab === index} className={activeTab === index ? 'is-active' : ''} onClick={() => setActiveTab(index)}>{tab.label}</button>)}</div><ul>{noticeTabs[activeTab].items.map(([title, date]) => <li key={title}><span>{title}</span><time>{date}</time></li>)}</ul></article><article className="history-card"><p>DAEJEON POLICE</p><h2>대전경찰 역사관</h2><span>대전경찰의 발자취를 만나보세요.</span><Link to="/history">역사관 둘러보기 →</Link></article></section>
    <section className="quick-links">{quickLinks.map(label => <button key={label}>{label} <span>→</span></button>)}</section>
    <section className="news-section"><div className="section-heading"><h2>대전경찰은 지금</h2><button>더보기 +</button></div><div className="news-grid">{news.map(item => <article key={item.image}><img src={imageUrl(item.image)} alt={item.title} /><h3>{item.title}</h3><p>{item.date}</p></article>)}</div></section>
    <section className="partners" aria-label="관련 기관">{partnerImages.map(image => <img key={image} src={imageUrl(image)} alt="관련 기관" />)}</section>
  </>
}

function HistoryPage() {
  const [year, setYear] = useState(2018)
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null)
  const [page, setPage] = useState(1)
  const years = [...new Set(gallery.map(item => item.year))]
  const currentItems = gallery.filter(item => item.year === year)
  const pageSize = 4
  const pageCount = Math.max(1, Math.ceil(currentItems.length / pageSize))
  const visibleItems = currentItems.slice((page - 1) * pageSize, page * pageSize)
  const changeYear = (direction: number) => { const next = years[years.indexOf(year) + direction]; if (next) { setYear(next); setPage(1) } }
  return <section className="history-page"><div className="page-title"><p><Link to="/">Home</Link> / 대전경찰소개 / 역사관</p><h1>대전경찰 역사관</h1></div><div className="year-picker"><button disabled={!years.includes(year - 1)} onClick={() => changeYear(-1)}>←</button><strong>{year}</strong><button disabled={!years.includes(year + 1)} onClick={() => changeYear(1)}>→</button></div>{visibleItems.length ? <div className="gallery-grid">{visibleItems.map(item => <button key={item.id} className="gallery-item" onClick={() => setSelected(item)}><img src={imageUrl(item.image)} alt={item.title} /><span><small>{item.date}</small>{item.title}</span></button>)}</div> : <p className="empty-message">등록된 역사관 자료가 없습니다.</p>}<nav className="pagination" aria-label="페이지 탐색">{Array.from({ length: pageCount }, (_, index) => <button key={index} onClick={() => setPage(index + 1)} aria-current={page === index + 1 ? 'page' : undefined}>{index + 1}</button>)}</nav>{selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={event => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="닫기">×</button><img src={imageUrl(selected.image)} alt={selected.title} /><h2>{selected.title}</h2><p>{selected.date} · 대전경찰의 주요 활동을 소개합니다.</p></article></div>}</section>
}

export default function App() { return <Layout><Routes><Route path="/" element={<HomePage />} /><Route path="/history" element={<HistoryPage />} /><Route path="*" element={<HomePage />} /></Routes></Layout> }
