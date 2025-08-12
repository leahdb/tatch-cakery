import React from "react";

/* ===== dummy motif — single-path SVG =====
   - use any path you want; keeping viewBox 0..1000 helps for easy scaling
   - this is a solid heart */
const DUMMY_MOTIF_PATH =
  "M500 900 C480 900 200 700 200 430 C200 290 310 200 430 200 C490 200 545 230 580 275 C615 230 670 200 730 200 C850 200 960 290 960 430 C960 700 680 900 660 900 C640 900 605 880 580 860 C555 880 520 900 500 900 Z";

/* ===== helper: motif preset (one-color, centered/scaled/rotated) ===== */
export default function PlexiMotif({
  targetRef,         // ref to top-cream <g> (for getBBox centering)
  rotation = 45,     // rotate with your cake
  color = "#D4AF37", // “gold”
  pathD = DUMMY_MOTIF_PATH,
  margin = 0.10      // leave 10% margin inside the cream area
}) {
  const [B, setB] = React.useState(null);

  React.useLayoutEffect(() => {
    const el = targetRef?.current;
    if (!el) return;
    const measure = () => {
      try {
        const b = el.getBBox();
        setB({
          x: b.x,
          y: b.y,
          width: b.width,
          height: b.height,
          cx: b.x + b.width / 2,
          cy: b.y + b.height / 2,
        });
      } catch {}
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [targetRef]);

  if (!B) return null;

  // motif’s “design space” is 1000x1000 because our path uses that scale.
  const motifW = 1000, motifH = 1000;
  const s = Math.min(
    (B.width * (1 - margin)) / motifW,
    (B.height * (1 - margin)) / motifH
  );

  // position so it’s centered over the cream area
  const targetW = motifW * s;
  const targetH = motifH * s;
  const x = B.cx - targetW / 2;
  const y = B.cy - targetH / 2;

  return (
    <g transform={`rotate(${rotation}, ${B.cx}, ${B.cy})`} pointerEvents="none">
      <defs>
        <filter id="plexiShadowPreset" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0.7" dy="1.1" stdDeviation="1.0" floodColor="#000" floodOpacity="0.28"/>
        </filter>
      </defs>

      <path
        d={pathD}
        transform={`translate(${x}, ${y}) scale(${s})`}
        fill={color}
        stroke="#A6862F"
        strokeWidth={0.6}
        filter="url(#plexiShadowPreset)"
      />
    </g>
  );
}