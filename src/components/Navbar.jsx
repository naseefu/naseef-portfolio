import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function ScrambleText({ text, active }) {
  const [display, setDisplay] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  useEffect(() => {
    if (!active) { setDisplay(text); return }
    let iter = 0
    const interval = setInterval(() => {
      setDisplay(text.split('').map((char, i) => {
        if (i < iter) return text[i]
        if (char === ' ') return ' '
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      iter += 1.5
      if (iter > text.length) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [active, text])
  return <span>{display}</span>
}

const navLinks = [
  { label: 'HOME',     to: '/' },
  { label: 'WORK',     to: '/work' },
  { label: 'ARTICLES', to: '/articles' },
  { label: 'AWARDS',   to: '/awards' },
  { label: 'CONTACT',  to: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav className="navbar"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
        <div className="navbar-top-bar" />
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">Naseefu Rahman</Link>

          <div className="nav-center">
            {navLinks.map(({ label, to }) => (
              <Link key={label} to={to}
                className={`nav-link ${location.pathname === to || location.pathname.startsWith(to + '/') ? 'nav-link-active' : ''}`}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}>
                <ScrambleText text={label} active={hovered === label} />
              </Link>
            ))}
          </div>

          <div className="nav-right-group">
            <ThemeToggle />
            <motion.button className="nav-email-btn nav-email-desktop"
              onClick={() => navigator.clipboard.writeText('naseefrahmankarumannil@gmail.com')}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <span>N.RAHMAN@EMAIL.COM</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </motion.button>
            <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span className={`ham-line ${menuOpen ? 'ham-line-1-open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'ham-line-2-open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'ham-line-3-open' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
            <div className="mobile-menu-links">
              {navLinks.map(({ label, to }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}>
                  <Link to={to} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
                    <span className="mobile-menu-num">0{i + 1}</span>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div className="mobile-menu-footer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}>
              <a href="mailto:naseefrahman90@gmail.com" className="mobile-menu-email">
                naseefrahman90@gmail.com
              </a>
              <div className="mobile-menu-socials">
                {[['LinkedIn','https://www.linkedin.com/in/naseefu-rahman-karumannil/'],['GitHub','https://github.com/naseefu'],['Twitter','https://x.com/naseefur']].map(([l, h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="mobile-social">{l}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}