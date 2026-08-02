import { useEffect, useState } from 'react'
import { navLinks } from '../data/portfolio'
import { useActiveSection } from '../hooks/useReveal'
import { Menu, Close } from './Icons'
import './Navbar.css'

const sectionIds = navLinks.map((l) => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The sheet is CSS-hidden on desktop — drop its state too so the body scroll
  // lock can never survive a resize.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 941px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner shell">
        {/* Plain wordmark, single orange letter — no container, no pill. */}
        <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
          Muhamm<span className="nav-brand-accent">a</span>d
        </a>

        <div className="nav-end">
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={isActive ? 'is-active' : ''}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <a href="#contact" className="nav-cta">
            Hire Me!
          </a>

          <button
            className="nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-sheet"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="nav-sheet" className={`nav-sheet ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {navLinks.map((link, i) => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                style={{ '--i': i }}
                className={isActive ? 'is-active' : ''}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
        </nav>
        <a href="#contact" className="btn btn-primary nav-sheet-cta" onClick={() => setOpen(false)}>
          Hire Me!
        </a>
      </div>
    </header>
  )
}
