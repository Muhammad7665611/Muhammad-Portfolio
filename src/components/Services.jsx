import { services } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Icon, ArrowUpRight } from './Icons'
import './Services.css'

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            How I can help
          </span>
          <h2 className="section-title">
            Services<span className="accent">.</span>
          </h2>
          <p className="section-sub">
            Whether it&apos;s a new product from scratch or a rescue mission on an existing one.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <article
              className="service-card glass reveal"
              key={service.title}
              style={{ '--reveal-delay': `${i * 70}ms` }}
            >
              <span className="service-index">{String(i + 1).padStart(2, '0')}</span>

              <div className="service-icon">
                <Icon name={service.icon} width={22} height={22} />
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-text">{service.text}</p>

              <a className="service-link" href="#contact">
                Let&apos;s talk
                <ArrowUpRight width={15} height={15} />
              </a>

              <span className="service-sheen" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
