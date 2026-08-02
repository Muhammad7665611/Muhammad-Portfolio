import { useMemo } from 'react'
import './StarField.css'

/**
 * The subtle star pattern behind the page. Positions are generated once and
 * rendered as plain divs — cheap enough that a canvas would be overkill.
 */
export default function StarField({ count = 90 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 3,
        opacity: Math.random() * 0.55 + 0.2,
      })),
    [count]
  )

  return (
    <div className="starfield" aria-hidden="true">
      <div className="starfield-grid" />
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--star-opacity': s.opacity,
            '--star-delay': `${s.delay}s`,
            '--star-duration': `${s.duration}s`,
          }}
        />
      ))}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  )
}
