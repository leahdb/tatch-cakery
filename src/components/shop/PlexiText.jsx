import React from "react";

/**
 * PlexiText
 * Connected "plexi" script text with mirror gold/silver or custom color.
 */
export default function PlexiText({
  text = "Happy Birthday Reem",
  targetRef,
  rotation = 45,
  padding = 6,
  maxRows = 3,
  maxCharsPerRow = 12,

  color = "#ff4fb7",
  font = { family: "'Great Vibes','Pacifico','Allura',cursive", size: 42, weight: 600 },
  plate = { show: true, fuseStroke: 3.5, color: "currentColor", opacity: 0.9 },
  extrude = { dx: 1.0, dy: 1.4, opacity: 0.35 },
  shadow = { dx: 0.6, dy: 1.0, blur: 1.1, opacity: 0.35 },
  bounds: fallbackBounds = { x: 220, y: 90, width: 300, height: 120 },
}) {
  const [B, setB] = React.useState(null);

  // split text into rows
  const rows = React.useMemo(() => {
    const words = text.trim().split(/\s+/);
    const result = [];
    let currentRow = "";
    for (const w of words) {
      if ((currentRow + " " + w).trim().length <= maxCharsPerRow) {
        currentRow = (currentRow + " " + w).trim();
      } else {
        if (currentRow) result.push(currentRow);
        currentRow = w;
      }
    }
    if (currentRow) result.push(currentRow);
    return result.slice(0, maxRows);
  }, [text, maxCharsPerRow, maxRows]);

  // ---- stable compare + shape helpers
  const sameB = (a, b) =>
    !!a &&
    !!b &&
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height &&
    a.cx === b.cx &&
    a.cy === b.cy;

  const toBox = (b, pad) => ({
    x: b.x + pad,
    y: b.y + pad,
    width: Math.max(0, b.width - pad * 2),
    height: Math.max(0, b.height - pad * 2),
    cx: b.x + b.width / 2,
    cy: b.y + b.height / 2,
  });

  // destructure primitives so deps are stable
  const {
    x: fbX,
    y: fbY,
    width: fbW,
    height: fbH,
  } = fallbackBounds;

  React.useLayoutEffect(() => {
    const el = targetRef?.current;

    const apply = (raw) => {
      const next = toBox(raw, padding);
      setB((prev) => (sameB(prev, next) ? prev : next));
    };

    if (!el) {
      // only update when fallback-derived box actually changes
      apply({ x: fbX, y: fbY, width: fbW, height: fbH });
      return;
    }

    let raf = 0;

    const measure = () => {
      try {
        const b = el.getBBox();
        apply(b);
      } catch {
        // getBBox can throw if element is not in DOM yet
      }
    };

    // initial measure
    measure();

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [targetRef?.current, padding, fbX, fbY, fbW, fbH]);

  const palette = React.useMemo(() => {
    return {
      faceFillId: "plexiCustomFill",
      stroke: color,
      faceStrokeWidth: 0.6,
      extrudeFill: shade(color, -0.45),
    };
  }, [color]);

  if (!B) return null;

  const lineHeight = font.size * 1.2;
  const startY = B.cy - ((rows.length - 1) * lineHeight) / 2;

  return (
    <g transform={`translate(70, 55) rotate(${rotation}, ${B.cx}, ${B.cy}) skewX(-27.77)`}>
      <defs>
        {/* gradients */}
        <linearGradient id="plexiGoldFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF4B0" />
          <stop offset="20%" stopColor="#FFD84D" />
          <stop offset="55%" stopColor="#E6B800" />
          <stop offset="80%" stopColor="#C19314" />
          <stop offset="100%" stopColor="#8D6B10" />
        </linearGradient>
        <linearGradient id="plexiSilverFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6F8FB" />
          <stop offset="25%" stopColor="#DEE3EA" />
          <stop offset="55%" stopColor="#C8CFD9" />
          <stop offset="80%" stopColor="#A9B2BF" />
          <stop offset="100%" stopColor="#8C96A6" />
        </linearGradient>
        <linearGradient id="plexiCustomFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint(color, 0.35)} />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor={shade(color, 0.25)} />
        </linearGradient>
        <filter id="plexiShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx={shadow.dx}
            dy={shadow.dy}
            stdDeviation={shadow.blur}
            floodColor="#000"
            floodOpacity={shadow.opacity}
          />
        </filter>
      </defs>

      {rows.map((line, i) => {
        const y = startY + i * lineHeight;

        return (
          <React.Fragment key={i}>
            {/* extrude */}
            <text
              x={B.cx}
              y={y}
              textAnchor="middle"
              fill={palette.extrudeFill}
              opacity={extrude.opacity}
              style={{
                fontFamily: font.family,
                fontWeight: font.weight,
                fontSize: font.size,
                fontFeatureSettings: "'liga' 1, 'clig' 1",
                letterSpacing: 2
              }}
              transform={`translate(${extrude.dx}, ${extrude.dy})`}
            >
              {line}
            </text>

            {/* fuse plate */}
            {plate.show && (
              <text
                x={B.cx}
                y={y}
                textAnchor="middle"
                fill="none"
                stroke={palette.stroke}
                strokeWidth={plate.fuseStroke}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={plate.opacity ?? 0.9}
                filter="url(#plexiShadow)"
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight,
                  fontSize: font.size,
                  fontFeatureSettings: "'liga' 1, 'clig' 1",
                  letterSpacing: 2
                }}
              >
                {line}
              </text>
            )}

            {/* face */}
            <text
              x={B.cx}
              y={y}
              textAnchor="middle"
              fill={`url(#${palette.faceFillId})`}
              stroke={palette.stroke}
              strokeWidth={palette.faceStrokeWidth}
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#plexiShadow)"
              style={{
                fontFamily: font.family,
                fontWeight: font.weight,
                fontSize: font.size,
                fontFeatureSettings: "'liga' 1, 'clig' 1",
                letterSpacing: 2
              }}
            >
              {line}
            </text>
          </React.Fragment>
        );
      })}
    </g>
  );
}

/* ------- tiny color helpers (no deps) ------- */
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHex({ r, g, b }) {
  const to = (v) => v.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}
function shade(hex, amt = 0.2) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: clamp(Math.round(r * (1 - Math.abs(amt))), 0, 255),
    g: clamp(Math.round(g * (1 - Math.abs(amt))), 0, 255),
    b: clamp(Math.round(b * (1 - Math.abs(amt))), 0, 255),
  });
}
function tint(hex, amt = 0.2) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: clamp(Math.round(r + (255 - r) * amt), 0, 255),
    g: clamp(Math.round(g + (255 - g) * amt), 0, 255),
    b: clamp(Math.round(b + (255 - b) * amt), 0, 255),
  });
}