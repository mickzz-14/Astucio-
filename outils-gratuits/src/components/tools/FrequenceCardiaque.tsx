"use client";

import { useMemo, useState } from "react";

const ZONES = [
  { nom: "Très légère", de: 50, a: 60 },
  { nom: "Endurance fondamentale", de: 60, a: 70 },
  { nom: "Aérobie", de: 70, a: 80 },
  { nom: "Seuil", de: 80, a: 90 },
  { nom: "Effort maximal", de: 90, a: 100 },
];

export default function FrequenceCardiaque() {
  const [age, setAge] = useState(35);

  const result = useMemo(() => {
    const ageValide = Math.min(Math.max(Math.round(age), 10), 100);
    const fcMax = 220 - ageValide;
    return {
      fcMax,
      zones: ZONES.map((z) => ({
        ...z,
        min: Math.round((fcMax * z.de) / 100),
        max: Math.round((fcMax * z.a) / 100),
      })),
    };
  }, [age]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="fcAge">
            Votre âge
          </label>
          <input
            id="fcAge"
            type="number"
            min={10}
            max={100}
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Fréquence cardiaque maximale estimée
          </p>
          <p className="text-3xl font-bold text-signal">{result.fcMax} bpm</p>
        </div>
        {result.zones.map((z) => (
          <div
            key={z.nom}
            className="flex items-baseline justify-between border-t border-white/10 pt-3"
          >
            <span className="text-sm text-white">
              {z.nom} <span className="text-white/50">({z.de}–{z.a} %)</span>
            </span>
            <span className="font-semibold text-white">
              {z.min}–{z.max} bpm
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
