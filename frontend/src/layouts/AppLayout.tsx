import { Archive, BookHeart, CheckCheck, CircleHelp, Heart, Home, Menu, Moon, Network, Settings, Sun, WandSparkles, X } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Home', to: '/', icon: Home }, { label: 'Conversations', to: '/conversations', icon: Heart },
  { label: 'My memories', to: '/memories', icon: BookHeart }, { label: 'Neural canvas', to: '/canvas', icon: Network },
  { label: 'Review queue', to: '/review', icon: CheckCheck }, { label: 'Actions', to: '/actions', icon: WandSparkles },
  { label: 'Archive', to: '/archive', icon: Archive }, { label: 'Legacy vault', to: '/legacy', icon: CircleHelp },
]

export function AppLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('baymax-theme') === 'dark' ? 'dark' : 'light')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExploreOpen, setIsExploreOpen] = useState(false)
  useEffect(() => { const update = (event: Event) => setTheme((event as CustomEvent<'light' | 'dark'>).detail); window.addEventListener('baymax-theme-change', update); return () => window.removeEventListener('baymax-theme-change', update) }, [])
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('baymax-theme', theme) }, [theme])

  return <div className="app-shell">
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label="BayMax home"><span className="brand-mark"><Heart size={17} fill="currentColor" /></span><span>baymax<span className="brand-dot">.</span></span></NavLink>
      <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
      <nav className="top-links" aria-label="Primary navigation">
        {links.slice(0, 3).map(({ label, to }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setIsMenuOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="top-actions">
        <div className="desktop-more"><button className="more-link" aria-expanded={isExploreOpen} onClick={() => setIsExploreOpen(!isExploreOpen)}>Explore <span>⌄</span></button>{isExploreOpen && <div className="explore-menu">{links.slice(3).map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setIsExploreOpen(false)}><Icon size={15}/>{label}</NavLink>)}<NavLink to="/settings" onClick={() => setIsExploreOpen(false)}><Settings size={15}/>Settings</NavLink></div>}</div>
        <div className="theme-switch" role="group" aria-label="Color theme">
          <button className={theme === 'light' ? 'selected' : ''} onClick={() => setTheme('light')} aria-pressed={theme === 'light'}><Sun size={15} /> <span>Light</span></button>
          <button className={theme === 'dark' ? 'selected' : ''} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}><Moon size={15} /> <span>Dark</span></button>
        </div>
        <NavLink className="settings-link" to="/settings" aria-label="Settings"><Settings size={18} /></NavLink>
        <span className="avatar" aria-label="Your profile">J</span>
      </div>
    </header>
    {isMenuOpen && <nav className="mobile-drawer" aria-label="More navigation">{links.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setIsMenuOpen(false)}><Icon size={17}/>{label}</NavLink>)}<NavLink to="/settings" onClick={() => setIsMenuOpen(false)}><Settings size={17}/>Settings</NavLink></nav>}
    <main className="main-content"><Outlet /></main>
    <footer className="footer-note"><span className="demo-dot"/> A quiet space for you <span className="footer-divider">·</span> Local demo — your data stays in this browser</footer>
  </div>
}
