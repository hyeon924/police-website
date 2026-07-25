import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer, PageHeader } from '../components/PageLayout'
import { gallery } from '../data/site'
import { imageUrl } from '../lib/assets'

export default function HistoryPage() {
  const [year, setYear] = useState(2018)
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null)
  const [page, setPage] = useState(1)
  const years = [...new Set(gallery.map(item => item.year))]
  const currentItems = gallery.filter(item => item.year === year)
  const pageCount = Math.max(1, Math.ceil(currentItems.length / 4))
  const visibleItems = currentItems.slice((page - 1) * 4, page * 4)
  const changeYear = (direction: number) => { const next = years[years.indexOf(year) + direction]; if (next) { setYear(next); setPage(1) } }
  return <PageContainer className="history-page"><PageHeader breadcrumb={<><Link to="/">Home</Link> / 대전경찰소개 / 역사관</>} title="대전경찰 역사관" /><div className="year-picker"><button disabled={!years.includes(year - 1)} onClick={() => changeYear(-1)}>←</button><strong>{year}</strong><button disabled={!years.includes(year + 1)} onClick={() => changeYear(1)}>→</button></div>{visibleItems.length ? <div className="gallery-grid">{visibleItems.map(item => <button key={item.id} className="gallery-item" onClick={() => setSelected(item)}><img src={imageUrl(item.image)} alt={item.title} /><span><small>{item.date}</small>{item.title}</span></button>)}</div> : <p className="empty-message">등록된 역사관 자료가 없습니다.</p>}<nav className="pagination" aria-label="페이지 탐색">{Array.from({ length: pageCount }, (_, index) => <button key={index} onClick={() => setPage(index + 1)} aria-current={page === index + 1 ? 'page' : undefined}>{index + 1}</button>)}</nav>{selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={event => event.stopPropagation()}><header className="modal-header"><h2>{selected.title}</h2><button className="modal-close" onClick={() => setSelected(null)} aria-label="닫기">×</button></header><img src={imageUrl(selected.image)} alt={selected.title} /><div className="modal-content"><time>{selected.date}</time><p>대전경찰의 주요 활동을 소개합니다.</p></div></article></div>}</PageContainer>
}
