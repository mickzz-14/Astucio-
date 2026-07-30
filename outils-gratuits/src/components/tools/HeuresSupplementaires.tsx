"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function HeuresSupplementaires() {
  const [tauxHoraire, setTauxHoraire] = useState(15);
  const [heures25, setHeures25] = useState(8);
  const [heures50, setHeures50] = useState(0);

  const result = useMemo(() => {
    const montant25 = heures25 * tauxHoraire * 1.25;
    const montant50 = heures50 * tauxHoraire * 1.5;
    return { montant25, montant50, total: montant25 + montant50 };
  }, [tauxHoraire, heures25, heures50]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Taux horaire brut</label>
          <input type="number" value={tauxHoraire} onChange={(e) => setTauxHoraire(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Heures majorées à 25 % (8 premières heures/semaine)</label>
          <input type="number" value={heures25} onChange={(e) => setHeures25(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Heures majorées à 50 % (au-delà)</label>
          <input type="number" value={heures50} onChange={(e) => setHeures50(Number(e.target.value) || 0)} className="input" />
        </div>
        <p className="text-xs leading-relaxed text-muted dark:text-muted-dark">
          Taux légaux par défaut en France (25 % puis 50 %), sauf accord d&apos;entreprise ou convention collective prévoyant d&apos;autres taux.
        </p>
      </div>
      <div className="readout flex flex-col justify-center gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Total heures supplémentaires</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.total)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Majoration 25 %</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.montant25)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Majoration 50 %</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.montant50)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
