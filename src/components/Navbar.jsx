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

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner shell">
        <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-mark">M</span>
          <span className="nav-brand-text">
            Muhammad<span className="nav-brand-dot">.</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.slice(1) ? 'is-active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary btn-sm nav-cta">
          Hire Me
        </a>

        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      <div className={`nav-sheet ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ '--i': i }}
              className={active === link.href.slice(1) ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>
          Hire Me
        </a>
      </div>
    </header>
  )
}
