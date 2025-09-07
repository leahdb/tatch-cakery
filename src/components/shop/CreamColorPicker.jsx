// ColorSwatchPickerBS.jsx
import React from "react";

const DEFAULT_COLORS = [
  { id: "gold",   label: "Gold",   type: "gradient", gradient: "linear-gradient(135deg,#B28900,#F1CF63 35%,#7A5A00 65%,#F7E7A1)" },
  { id: "silver", label: "Silver", type: "gradient", gradient: "linear-gradient(135deg,#9AA0A6,#ECEFF1 35%,#6B7280 65%,#F5F7FA)" },
  { id: "black",  label: "Black",  hex: "#111827" },
  { id: "white",  label: "White",  hex: "#ffffff", border: true },
  { id: "red",    label: "Red",    hex: "#EF4444" },
  { id: "blue",   label: "Blue",   hex: "#3B82F6" },
  { id: "green",  label: "Green",  hex: "#10B981" },
  { id: "pink",   label: "Pink",   hex: "#EC4899" },
  { id: "purple", label: "Purple", hex: "#8B5CF6" },
  { id: "yellow",    label: "Yellow",    hex: "#EF4444" },
  { id: "orange",   label: "Orange",   hex: "#3B82F6" },
  { id: "fuchsia",  label: "Fuchsia",  hex: "#10B981" },
  { id: "pink",   label: "Pink",   hex: "#EC4899" },
  { id: "purple", label: "Purple", hex: "#8B5CF6" },
];

/**
 * Props:
 *  - value: string (id) OR a full color object { id, ... }
 *  - onChange: (sameShapeAsValue) => void
 *    If you pass a string as value, you'll get a string back.
 *    If you pass an object, you'll get the full object back.
 */
export default function ColorPicker({
  value,
  onChange,
  options = DEFAULT_COLORS,
  title = "Pick a color",
  grad = true,
}) {
  // normalize for selection check
  const selectedId = typeof value === "string" ? value : value?.id;

  return (
    <div role="radiogroup" aria-label={title}>
      <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(10, 1fr)" }}>
        {options.map((opt) => {
          const isSel = selectedId === opt.id;
          const style =
            opt.type === "gradient" && grad
              ? { backgroundImage: opt.gradient }
              : { backgroundColor: opt.hex };

          return (
            <button
              key={opt.id}
              role="radio"
              aria-checked={isSel}
              title={opt.label}
              type="button"
              className={[
                "position-relative border rounded-circle",
                "d-flex align-items-center justify-content-center",
                "swatch-btn",
                opt.border ? "border-secondary" : "border-0",
                isSel ? "swatch-selected" : "",
              ].join(" ")}
              style={style}
              onClick={() => onChange(opt)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(opt);
                }
              }}
            >
              {isSel && (
                <span
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "9999px",
                    padding: "0 .35rem",
                    fontSize: 12,
                    lineHeight: "16px",
                    color: "#000",
                  }}
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
              <span className="visually-hidden">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
