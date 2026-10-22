"use client";

import { useMemo, useState } from "react";

const CYCLE = 90;
const ENDORMISSEMENT = 15;

function hhmm(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function duree(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

export default function SommeilCycles() {
  const [mode, setMode] = useState<"lever" | "coucher">("lever");
  const [heure, setHeure] = useState("07:00");

  const lignes = useMemo(() => {
    const [h, m] = heure.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return [];
    const base = h * 60 + m;
    const cycles = mode === "lever" ? [6, 5, 4, 3] : [3, 4, 5, 6];
    return cycles.map((n) => ({
      cycles: n,
      heure:
        mode === "lever"
          ? hhmm(base - n * CYCLE - ENDORMISSEMENT)
          : hhmm(base + ENDORMISSEMENT + n * CYCLE),
      sommeil: duree(n * CYCLE),
    }));
  }, [mode, heure]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <span className="label">Je veux calculer</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("lever")}
              className={mode === "lever" ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              Mon heure de coucher
            </button>
            <button
              type="button"
              onClick={() => setMode("coucher")}
              className={mode === "coucher" ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              Mon heure de réveil
            </button>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="sommeilHeure">
            {mode === "lever" ? "Je dois me lever à" : "Je me couche à"}
          </label>
          <input
            id="sommeilHeure"
            type="time"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-4 p-6">
        <p className="text-xs uppercase tracking-widest text-white/50">
          {mode === "lever" ? "Heures de coucher conseillées" : "Heures de réveil conseillées"}
        </p>
        {lignes.map((l) => (
          <div
            key={l.cycles}
            className="flex items-baseline justify-between border-t border-white/10 pt-3"
          >
            <span className="text-2xl font-bold text-signal">{l.heure}</span>
            <span className="text-sm text-white/60">
              {l.cycles} cycles · {l.sommeil} de sommeil
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
