import './Decor.css'

/**
 * Background decoration: flat orange blocks bleeding off the viewport edges, a
 * pair of hairline orange rules and a faint technical grid. Replaces the old
 * StarField — no blur, no radial gradients, no twinkling. Everything is a plain
 * div at low opacity, so the whole layer is essentially free to paint.
 */
export default function Decor() {
  return (
    <div className="decor" aria-hidden="true">
      {/* Faint 72px lattice, masked so it dissolves before reaching the edges */}
      <div className="decor-grid" />

      {/* Hairline vertical rules that echo the layout gutters */}
      <span className="decor-rule decor-rule-l" />
      <span className="decor-rule decor-rule-r" />

      {/* Solid slabs anchored past the left edge */}
      <span className="decor-block decor-block-l1" />
      <span className="decor-block decor-block-l2" />

      {/* Solid slabs anchored past the right edge */}
      <span className="decor-block decor-block-r1" />
      <span className="decor-block decor-block-r2" />

      {/* Small accents fully on-screen, for rhythm between the big blocks */}
      <span className="decor-chip" />
      <span className="decor-outline" />
    </div>
  )
}
