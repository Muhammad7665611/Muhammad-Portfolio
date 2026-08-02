import { profile, navLinks, socials } from '../data/portfolio'
import { Icon, ArrowRight } from './Icons'
import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-card glass">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="footer-logo">
                <span className="nav-mark">M</span>
                <span>
                  {profile.name}
                  <span className="footer-role">{profile.roles[0]}</span>
                </span>
              </a>
              <p className="footer-blurb">
                Building modern web and mobile products with React, React Native, Node.js and AI.
                Always open to an interesting problem.
              </p>
              <a className="btn btn-primary btn-sm footer-cta" href="#contact">
                Start a project
                <ArrowRight width={16} height={16} />
              </a>
            </div>

            <nav className="footer-col" aria-label="Footer links">
              <h4>Links</h4>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-col" aria-label="Social links">
              <h4>Social Links</h4>
              <ul>
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      <Icon name={s.icon} width={15} height={15} />
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-col">
              <h4>Get in touch</h4>
              <ul>
                <li>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
                </li>
                <li>
                  <span>{profile.location}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {year} {profile.name}. All rights reserved.
            </span>
            <span className="footer-built">
              Built with React &amp; Vite
              <span className="footer-heart" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
