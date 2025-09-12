import React from "react";
import { MOTIF_GROUPS } from "./Motifs";

export default function MotifPicker({ value, onChange }) {
  return (
    <div className="space-y-3">
        <div className="row">
            {MOTIF_GROUPS[0].items.map(m => {
                const isSel = value?.type === "preset" && value?.id === m.id;
                return (
                    <button
                    key={m.id}
                    onClick={() =>
                        onChange({
                        type: "preset",
                        id: m.id,
                        pathD: m.pathD,
                        label: m.label,
                        pathOnCake: m.pathOnCake,
                        })
                    }
                    className={`aspect-square rounded-xl border flex items-center justify-center overflow-hidden col-3${
                        isSel ? " ring-2 ring-black bg-gray-selected" : ""
                    }`}
                    title={m.label}
                    aria-pressed={isSel}
                    >
                    <svg
                        viewBox="0 0 300 300"
                        width="64"
                        height="64"
                        aria-hidden="true"
                        preserveAspectRatio="xMidYMid meet"
                        className="mx-auto my-auto"
                    >
                        <g transform="translate(150,200)">
                        <path d={m.pathD} fill="black" transform="translate(-150,-150)" />
                        </g>
                    </svg>
                    </button>
                );
            })}
        </div>
    </div>
  );
}
