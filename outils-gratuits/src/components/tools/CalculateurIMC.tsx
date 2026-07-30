"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

function interpretation(imc: number) {
  if (imc < 18.5) return { label: "Insuffisance pondérale", color: "text-blue-400" };
  if (imc < 25) return { label: "Corpulence normale", color: "text-emerald-400" };
  if (imc < 30) return { label: "Surpoids", color: "text-signal" };
  return { label: "Obésité", color: "text-red-400" };
}

export default function CalculateurIMC() {
  const [taille, setTaille] = useState(170);
  const [poids, setPoids] = useState(70);

  const imc = useMemo(() => {
    const t = taille / 100;
    if (t <= 0) return 0;
    return poids / (t * t);
  }, [taille, poids]);

  const info = interpretation(imc);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="taille">
            Taille (cm)
          </label>
          <input
            id="taille"
            type="number"
            value={taille}
            onChange={(e) => setTaille(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="poids">
            Poids (kg)
          </label>
          <input
            id="poids"
            type="number"
            value={poids}
            onChange={(e) => setPoids(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <p className="text-xs leading-relaxed text-muted dark:text-muted-dark">
          Résultat donné à titre indicatif. L&apos;IMC ne remplace pas un avis médical.
        </p>
      </div>

      <div className="readout flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">Votre IMC</p>
        <p className="text-4xl font-bold text-signal">{formatNumber(imc, 1)}</p>
        <p className={`text-sm font-semibold ${info.color}`}>{info.label}</p>
      </div>
    </div>
  );
}
