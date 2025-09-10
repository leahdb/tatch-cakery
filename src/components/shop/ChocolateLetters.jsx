import React from "react";

/**
 * ChocolateMoldMessageAuto
 * Auto-measures target SVG element's bbox to center & rotate tiles.
 * Accurate centering with separate letter/word spacing.
 */
export default function ChocolateMoldMessageAuto({
  text = "HAPPY BIRTHDAY",
  targetRef,                         // ref to <g> (your top-cream band)
  rotation = 45,                     // rotate around band center
  padding = 6,                       // inset inside measured band
  // Fallback if no ref (optional):
  bounds: fallbackBounds = { x: 220, y: 90, width: 300, height: 90 },

  // Tile box (a chocolate letter tile)
  tile = { w: 26, h: 32, rx: 6 },

  // Spacing controls (px)
  spacing = {
    letter: 1,    // gap between adjacent letters (tiles)
    word: 18,     // gap for a space character
    row: 8        // vertical gap between rows
  },

  // Row control
  rows = { maxRows: 2 },

  // Colors / font
  palette = {
    tileFillTop: "#6a3b26",
    tileFillMid: "#4b2a1a",
    tileFillBot: "#3a2015",
    tileEdge: "#2e1a12",
    letterFill: "#f4e7d2",
    letterStroke: "#e0cfb6",
  },
  font = { family: "sans-serif", weight: 800, size: 60 },

  showOverflowHint = true,
}) {
  const [measured, setMeasured] = React.useState(null);

  // Measure bbox of target band
  React.useLayoutEffect(() => {
    const el = targetRef?.current;
    if (!el) { setMeasured(null); return; }

    let raf = 0;
    const measure = () => {
      try {
        const b = el.getBBox();
        setMeasured({
          x: b.x + padding,
          y: b.y + padding,
          width: Math.max(0, b.width - padding * 2),
          height: Math.max(0, b.height - padding * 2),
          cx: b.x + b.width / 2,
          cy: b.y + b.height / 2,
        });
      } catch {
        setMeasured(null);
      }
    };
    raf = requestAnimationFrame(measure);
    
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => measure()) : null;
    ro?.observe(el);

    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [targetRef, padding]);

  // Resolve working bounds + center
  const B = measured
    ? measured
    : {
        ...fallbackBounds,
        cx: fallbackBounds.x + fallbackBounds.width / 2,
        cy: fallbackBounds.y + fallbackBounds.height / 2,
      };

  const cleanText = (text || "").toUpperCase();

  // --- spacing helpers (accurate width & placement) ---
  const measureLineWidth = React.useCallback((line, w) => {
    let width = 0;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const next = line[i + 1];

      if (ch === " ") { width += spacing.word; continue; }
      width += w; // tile width
      if (next && next !== " ") width += spacing.letter;
    }
    return width;
  }, [spacing.letter, spacing.word]);

  const layoutLineTiles = React.useCallback((line, startX, y, w) => {
    const tiles = [];
    let x = startX;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const next = line[i + 1];

      if (ch === " ") { x += spacing.word; continue; }
      tiles.push({ ch, x, y });
      x += 40;
      if (next && next !== " ") x += spacing.letter;
    }
    return tiles;
  }, [spacing.letter, spacing.word]);

  // Layout
  const layout = React.useMemo(() => {
    const { w, h } = tile;
    const maxRowsByHeight = Math.max(
      1,
      Math.floor((B.height + spacing.row) / (h + spacing.row))
    );
    const maxRows = Math.min(rows.maxRows || 1, maxRowsByHeight);

    // Greedy wrap to rows by available width (using measured widths)
    const chars = cleanText.split("");
    const lines = [[]];
    let currentRow = 0;

    const tryPush = (ch) => {
      const candidate = [...lines[currentRow], ch];
      const lineW = measureLineWidth(candidate, w);
      if (lineW <= B.width) {
        lines[currentRow] = candidate;
        return true;
      }
      return false;
    };

    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];

      // Try to place in current row
      if (!tryPush(ch)) {
        // If we can start a new row, prefer to break at previous space (classic word-wrap)
        if (currentRow + 1 < maxRows) {
          // Backtrack to last space in current row if the last char we tried was a letter
          // We’ll start next row from that word
          const cur = lines[currentRow];
          let lastSpace = -1;
          for (let j = cur.length - 1; j >= 0; j--) {
            if (cur[j] === " ") { lastSpace = j; break; }
          }
          if (lastSpace > -1) {
            const carry = cur.splice(lastSpace + 1);
            if (cur[cur.length - 1] === " ") cur.pop(); // trim trailing space
            currentRow++;
            lines[currentRow] = [];
            // place carried chars first
            for (const c of carry) {
              if (!tryPush(c)) { break; }
            }
            // then place current char
            tryPush(ch);
          } else {
            // hard wrap
            currentRow++;
            lines[currentRow] = [];
            tryPush(ch);
          }
        } else {
          // No more rows → stop reading (truncate)
          break;
        }
      }
    }

    // Trim any empty lines at end
    while (lines.length && lines[lines.length - 1].length === 0) lines.pop();

    // Compute block height & starting Y for vertical centering
    const blockH =
      lines.length * h + Math.max(0, lines.length - 1) * spacing.row;
    const startY = B.y + (B.height - blockH) / 2;

    // Build positioned tiles per line using accurate width
    const lineLayouts = lines.map((line, li) => {
      const lineW = measureLineWidth(line, w);
      const lineX = B.x + (B.width - lineW) / 2;
      const lineY = startY + li * (h + spacing.row);
      const tiles = layoutLineTiles(line, lineX, lineY, w);
      return { tiles };
    });

    // Simple overflow hint: if we didn't place every char
    const placedCharCount = lines.reduce((a, l) => a + l.length, 0);
    const overflow = placedCharCount < cleanText.length;

    return { lineLayouts, overflow };
  }, [cleanText, B.x, B.y, B.width, B.height, tile, spacing, rows, measureLineWidth, layoutLineTiles]);

  const { lineLayouts, overflow } = layout;
  const { w, h, rx } = tile;

  return (
    <g transform={`translate(80, 30) rotate(${rotation}, ${B.cx}, ${B.cy}) skewX(-27.77)`}>
      <defs>
        <linearGradient id="chocoShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={palette.tileFillTop}/>
          <stop offset="55%" stopColor={palette.tileFillMid}/>
          <stop offset="100%" stopColor={palette.tileFillBot}/>
        </linearGradient>
        <filter id="letterDrop" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.35"/>
        </filter>
      </defs>

      {lineLayouts.map((line, li) => (
        <g key={li} transform={
      li === 2
        ? "translate(-45, 0)"
        : li === 0
        ? "translate(-15, 0)"
        : undefined
    }>
          {line.tiles.map((t, i) => (
            <g key={i} transform={`translate(${t.x}, ${t.y})`}>
            
            <text
            x={w/2}
            y={h/2 + font.size*0.36}
            textAnchor="middle"
            filter="url(#letterDrop)"                 // ← soft shadow under the face
            style={{
                fontFamily: font.family,
                fontWeight: font.weight,
                fontSize: font.size,
                letterSpacing: "1px",
                fill: "#fff6e6",               // ← subtle highlight
                paintOrder: "stroke",
                stroke: "#EADCC8",                      // thin rim = bevel
                strokeWidth: 2.8,
                textShadow: `
                  2px 0.5px 1px rgb(242, 234, 219),
                  2px 1px 1px rgb(231, 224, 210),
                  2px 1.5px 1px rgb(219, 213, 201),
                  2px 2px 1px rgb(207, 202, 191),
                  2px 2.5px 1px rgb(196, 191, 181),
                  2px 5px 10px rgba(35, 34, 33, 0.2)
                `
            }}
            >
            {t.ch}
            </text>
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}