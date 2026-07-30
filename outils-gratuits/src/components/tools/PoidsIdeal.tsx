"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

export default function PoidsIdeal() {
  const [sexe, setSexe] = useState<"homme" | "femme">("homme");
  const [taille, setTaille] = useState(175);

  const poids = useMemo(() => {
    // Formule de Lorentz
    if (sexe === "homme") return taille - 100 - (taille - 150) / 4;
    return taille - 100 - (taille - 150) / 2.5;
  }, [sexe, taille]);

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
        <div>
          <label className="label">Taille (cm)</label>
          <input type="number" value={taille} onChange={(e) => setTaille(Number(e.target.value) || 0)} className="input" />
        </div>
        <p className="text-xs leading-relaxed text-muted dark:text-muted-dark">
          Calculé selon la formule de Lorentz, une estimation indicative parmi d&apos;autres. La corpulence idéale dépend aussi de la morphologie et de la masse musculaire.
        </p>
      </div>
      <div className="readout flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">Poids indicatif</p>
        <p className="text-3xl font-bold text-signal">{formatNumber(Math.max(0, poids), 1)} kg</p>
      </div>
    </div>
  );
}
