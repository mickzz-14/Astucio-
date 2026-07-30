"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

export default function CongesPayes() {
  const [mois, setMois] = useState(12);

  const result = useMemo(() => {
    const joursOuvrables = Math.min(mois, 12) * 2.5;
    const joursOuvres = joursOuvrables * (5 / 6);
    return { joursOuvrables, joursOuvres };
  }, [mois]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Nombre de mois travaillés sur la période de référence</label>
          <input
            type="range"
            min={0}
            max={12}
            value={mois}
            onChange={(e) => setMois(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
          <input type="number" min={0} max={12} value={mois} onChange={(e) => setMois(Number(e.target.value) || 0)} className="input mt-2" />
        </div>
        <p className="text-xs leading-relaxed text-muted dark:text-muted-dark">
          Calcul basé sur la règle légale française de 2,5 jours ouvrables acquis par mois de travail effectif (soit 30 jours ouvrables, ou 5 semaines, pour une année complète). Certaines conventions collectives sont plus favorables.
        </p>
      </div>
      <div className="readout flex flex-col justify-center gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Jours ouvrables acquis</p>
          <p className="text-3xl font-bold text-signal">{formatNumber(result.joursOuvrables, 1)} jours</p>
        </div>
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs uppercase tracking-widest text-white/50">Équivalent en jours ouvrés</p>
          <p className="text-lg font-semibold text-white">{formatNumber(result.joursOuvres, 1)} jours</p>
        </div>
      </div>
    </div>
  );
}
