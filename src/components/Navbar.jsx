import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio'
import { useActiveSection } from '../hooks/useReveal'
import { Menu, Close } from './Icons'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

const sectionIds = navLinks.map((l) => l.href.slice(1))

/* Surname carries the accent. Split from profile.name so the wordmark follows
   the data file rather than hardcoding the spelling in two places. */
const nameParts = profile.name.trim().split(/\s+/)
const surname = nameParts.length > 1 ? nameParts.pop() : ''
const forenames = nameParts.join(' ')

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
      <div className="nav-top shell">
        {/* Plain wordmark, single accent letter — no container, no pill. */}
        <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-brand-text">
            {forenames} <span className="nav-brand-accent">{surname}</span>
          </span>
        </a>

        <div className="nav-end">

          <a href="#contact" className="nav-cta">
            Hire Me!
          </a>

          {/* Last in the row so it sits hard right, past the CTA. */}
          <ThemeToggle />

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

      {/* Second row: the links, boxed. Hidden on mobile — the sheet covers it. */}
      <div className="nav-row shell">
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

        {/* The desktop toggle is hidden at this width, so the sheet needs its own. */}
        <ThemeToggle className="is-block" />
      </div>
    </header>
  )
}
