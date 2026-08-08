import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const MEDIA = '(prefers-color-scheme: light)'

/** Meta colours must match --bg in each theme so mobile browser chrome blends in. */
const THEME_COLOR = { dark: '#0f172a', light: '#f8fafc' }

/**
 * Reads whatever the pre-paint script in index.html already decided, so the
 * hook's first render agrees with what is on screen. Falling back to the system
 * preference here too keeps SSR/no-script paths sane.
 */
function currentTheme() {
  if (typeof document === 'undefined') return 'dark'
  const applied = document.documentElement.getAttribute('data-theme')
  if (applied === 'light' || applied === 'dark') return applied
  return window.matchMedia(MEDIA).matches ? 'light' : 'dark'
}

function apply(theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_COLOR[theme])
}

/**
 * Light/dark theme with three behaviours worth knowing about:
 *
 *  1. An explicit choice is remembered in localStorage and always wins.
 *  2. With no stored choice, the OS preference is followed — and keeps being
 *     followed if the user changes it while the page is open.
 *  3. Toggling adds a short-lived class to <html> so only the colour change
 *     animates. A permanent `transition: background` on everything would make
 *     every hover and scroll-reveal feel sluggish.
 */
export function useTheme() {
  const [theme, setTheme] = useState(currentTheme)

  // Follow the OS until the visitor expresses a preference of their own.
  useEffect(() => {
    const mq = window.matchMedia(MEDIA)
    const onChange = (e) => {
      if (localStorage.getItem(STORAGE_KEY)) return
      const next = e.matches ? 'light' : 'dark'
      setTheme(next)
      apply(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'

      const root = document.documentElement
      root.classList.add('theme-switching')
      apply(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Private mode / storage disabled — the theme still applies for this
        // session, it just will not be remembered.
      }
      window.setTimeout(() => root.classList.remove('theme-switching'), 300)

      return next
    })
  }, [])

  return { theme, toggle, isLight: theme === 'light' }
}
