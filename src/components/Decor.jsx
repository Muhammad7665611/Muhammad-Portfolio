import './Decor.css'

/**
 * Background: a fine dot grid over three soft indigo/cyan glow blobs.
 *
 * Drawn entirely in CSS rather than shipped as an image — see Decor.css for
 * why. Plain divs, no per-element randomness, so the whole layer is cheap.
 */
export default function Decor() {
  return (
    <div className="decor" aria-hidden="true">
      {/* Painted first so the dots read on top of the colour */}
      <span className="decor-glow decor-glow-1" />
      <span className="decor-glow decor-glow-2" />
      <span className="decor-glow decor-glow-3" />

      <div className="decor-grid" />

      <span className="decor-rule decor-rule-l" />
      <span className="decor-rule decor-rule-r" />
    </div>
  )
}
