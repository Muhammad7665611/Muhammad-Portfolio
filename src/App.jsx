import { useEffect, useState } from 'react'
import Decor from './components/Decor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Services from './components/Services'
import Stats from './components/Stats'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ArrowDown } from './components/Icons'
import './App.css'

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`to-top ${show ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowDown width={18} height={18} />
    </button>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Decor />
      <Navbar />

      {/* Section order mirrors the reference layout:
          hero → about → services → stats → portfolio → testimonials → cta */}
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Services />
        <Stats />
        <Projects />
        <TechStack />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
