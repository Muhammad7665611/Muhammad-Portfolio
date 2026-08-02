import { services } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Icon, ArrowUpRight, ArrowRight } from './Icons'
import './Services.css'

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">How I can help</span>
          <h2 className="section-title">
            Services<span className="accent">.</span>
          </h2>
          <span className="title-rule" />
          <p className="section-sub">
            Whether it&apos;s a new product from scratch or a rescue mission on an existing one.
          </p>
        </div>

        {/* Compact horizontal chips: icon tile, index + name, one grey line, arrow. */}
        <div className="services-grid">
          {services.map((service, i) => (
            <a
              className={`service-chip card reveal${i === 0 ? ' is-active' : ''}`}
              key={service.title}
              href="#contact"
              aria-label={`${service.title} — let's talk about your project`}
              style={{ '--reveal-delay': `${i * 60}ms` }}
            >
              <span className="service-tile">
                <Icon name={service.icon} width={20} height={20} />
              </span>

              <div className="service-body">
                <div className="service-head">
                  <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="service-title">{service.title}</h3>
                </div>
                {/* Chip stays short, so the copy clamps — the tooltip carries the rest. */}
                <p className="service-text" title={service.text}>
                  {service.text}
                </p>
              </div>

              <ArrowUpRight className="service-arrow" width={16} height={16} />
            </a>
          ))}
        </div>

        <div className="services-cta reveal" style={{ '--reveal-delay': '120ms' }}>
          <a className="btn btn-primary" href="#contact">
            Let&apos;s talk
            <ArrowRight width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
