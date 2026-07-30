"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

type Mode = "part" | "variation" | "total";

export default function CalculateurPourcentage() {
  const [mode, setMode] = useState<Mode>("part");
  const [a, setA] = useState(20);
  const [b, setB] = useState(150);

  const result = useMemo(() => {
    if (mode === "part") return (a / 100) * b;
    if (mode === "variation") return b !== 0 ? ((a - b) / b) * 100 : 0;
    return b !== 0 ? (a / b) * 100 : 0;
  }, [mode, a, b]);

  const labels: Record<Mode, { a: string; b: string; result: string; tab: string }> = {
    part: { a: "Pourcentage (%)", b: "Du nombre", result: "Résultat", tab: "X % de Y" },
    variation: {
      a: "Nouvelle valeur",
      b: "Ancienne valeur",
      result: "Variation (%)",
      tab: "Variation en %",
    },
    total: { a: "Valeur", b: "Est quel % de", result: "Pourcentage (%)", tab: "X est % de Y" },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(labels) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={mode === m ? "btn-primary" : "btn-secondary"}
          >
            {labels[m].tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="label">{labels[mode].a}</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label">{labels[mode].b}</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
        </div>

        <div className="readout flex flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">{labels[mode].result}</p>
          <p className="text-4xl font-bold text-signal">
            {formatNumber(result, 2)}
            {mode !== "part" ? " %" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
