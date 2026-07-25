import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../data/site'
import { imageUrl } from '../lib/assets'

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  return <div className="site-shell">
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand"><img src={imageUrl('logo.png')} alt="대전경찰청" /></Link>
        <div className="header-tools"><span>사이트맵</span></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기" aria-expanded={menuOpen}><i></i><i></i><i></i></button>
      </div>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="주요 메뉴"><ul>
        {navItems.map(item => <li key={item.label} className={expanded === item.label ? 'is-expanded' : ''}>
          {item.label === '대전경찰소개' ? <Link to="/history">{item.label}</Link> : <button onClick={() => setExpanded(expanded === item.label ? null : item.label)}>{item.label}</button>}
          <ul>{item.children.map(child => <li key={child}>{child === '대전경찰 역사관' ? <Link to="/history">{child}</Link> : <button>{child}</button>}</li>)}</ul>
        </li>)}
      </ul></nav>
    </header>
    <main>{children}</main>
    <footer className="footer"><img src={imageUrl('footer_logo.png')} alt="대전경찰청" /><p>대전광역시 서구 둔산중로 77 · 대표전화 182</p><small>Copyright © Daejeon Metropolitan Police Agency. All rights reserved.</small></footer>
  </div>
}
