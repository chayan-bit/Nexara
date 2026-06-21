// Fixed, ultra-subtle film grain over the whole page — a premium texture cue.
// Pure SVG fractal noise, no JS animation, GPU-cheap.
export function Grain() {
  return (
    <div className="grain" aria-hidden>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="nx-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nx-noise)" />
      </svg>
    </div>
  );
}
