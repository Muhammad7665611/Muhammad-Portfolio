import { useTheme } from '../hooks/useTheme'
import './ThemeToggle.css'

/* Defined locally — these two glyphs exist for this control alone. */

function Sun(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" aria-hidden="true" focusable="false" {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  )
}

function Moon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
    </svg>
  )
}

/**
 * Light/dark switch. Renders the icon of the theme you would switch TO, which
 * is the convention people expect from a single-button toggle.
 */
export default function ThemeToggle({ className = '' }) {
  const { isLight, toggle } = useTheme()

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Dark theme' : 'Light theme'}
    >
      <span className="theme-toggle-glyph">
        {isLight ? <Moon width={17} height={17} /> : <Sun width={17} height={17} />}
      </span>
    </button>
  )
}
