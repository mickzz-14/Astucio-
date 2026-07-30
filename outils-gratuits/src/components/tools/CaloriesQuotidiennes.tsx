"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

const activites = [
  { label: "Sédentaire (peu ou pas de sport)", factor: 1.2 },
  { label: "Légèrement actif (1-3 j/semaine)", factor: 1.375 },
  { label: "Modérément actif (3-5 j/semaine)", factor: 1.55 },
  { label: "Très actif (6-7 j/semaine)", factor: 1.725 },
  { label: "Extrêmement actif (sport intense quotidien)", factor: 1.9 },
];

export default function CaloriesQuotidiennes() {
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [age, setAge] = useState(30);
  const [taille, setTaille] = useState(175);
  const [poids, setPoids] = useState(70);
  const [activite, setActivite] = useState(activites[1]);

  const result = useMemo(() => {
    const base =
      sexe === "homme"
        ? 10 * poids + 6.25 * taille - 5 * age + 5
        : 10 * poids + 6.25 * taille - 5 * age - 161;
    return { bmr: base, tdee: base * activite.factor };
  }, [sexe, age, taille, poids, activite]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setSexe("homme")} className={sexe === "homme" ? "btn-primary" : "btn-secondary"}>
            Homme
          </button>
          <button type="button" onClick={() => setSexe("femme")} className={sexe === "femme" ? "btn-primary" : "btn-secondary"}>
            Femme
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">Âge</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 0)} className="input" />
          </div>
          <div>
            <label className="label">Taille (cm)</label>
            <input type="number" value={taille} onChange={(e) => setTaille(Number(e.target.value) || 0)} className="input" />
          </div>
          <div>
            <label className="label">Poids (kg)</label>
            <input type="number" value={poids} onChange={(e) => setPoids(Number(e.target.value) || 0)} className="input" />
          </div>
        </div>
        <div>
          <label className="label">Niveau d&apos;activité</label>
          <select
            value={activite.label}
            onChange={(e) => setActivite(activites.find((a) => a.label === e.target.value) ?? activites[1])}
            className="input"
          >
            {activites.map((a) => (
              <option key={a.label} value={a.label}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="readout flex flex-col gap-4 p-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Besoin calorique quotidien</p>
          <p className="text-3xl font-bold text-signal">{formatNumber(result.tdee, 0)} kcal</p>
        </div>
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Métabolisme de base (BMR)</p>
          <p className="text-lg font-semibold text-white">{formatNumber(result.bmr, 0)} kcal</p>
        </div>
      </div>
    </div>
  );
}
