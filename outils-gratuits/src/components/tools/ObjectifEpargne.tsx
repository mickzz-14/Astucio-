"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function ObjectifEpargne() {
  const [objectif, setObjectif] = useState(10000);
  const [depart, setDepart] = useState(500);
  const [annees, setAnnees] = useState(3);
  const [taux, setTaux] = useState(3);

  const result = useMemo(() => {
    const n = Math.max(1, Math.round(annees * 12));
    const i = Math.max(taux, 0) / 100 / 12;
    const croissance = Math.pow(1 + i, n);
    const manque = objectif - depart * croissance;
    let versement: number;
    if (manque <= 0) versement = 0;
    else if (i === 0) versement = (objectif - depart) / n;
    else versement = (manque * i) / (croissance - 1);
    const verse = versement * n;
    return {
      versement,
      verse,
      interets: objectif - depart - verse,
      atteint: manque <= 0,
    };
  }, [objectif, depart, annees, taux]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="epObjectif">
            Objectif à atteindre (€)
          </label>
          <input
            id="epObjectif"
            type="number"
            min={0}
            value={objectif}
            onChange={(e) => setObjectif(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="epDepart">
            Capital déjà épargné (€)
          </label>
          <input
            id="epDepart"
            type="number"
            min={0}
            value={depart}
            onChange={(e) => setDepart(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="epAnnees">
              Durée (années)
            </label>
            <input
              id="epAnnees"
              type="number"
              min={1}
              value={annees}
              onChange={(e) => setAnnees(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="epTaux">
              Rendement annuel (%)
            </label>
            <input
              id="epTaux"
              type="number"
              min={0}
              step={0.1}
              value={taux}
              onChange={(e) => setTaux(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            À épargner chaque mois
          </p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.versement)}</p>
          {result.atteint && (
            <p className="mt-1 text-sm text-white/60">
              Votre capital de départ suffit déjà à atteindre l&apos;objectif.
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Total versé</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.verse)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Intérêts gagnés</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(Math.max(result.interets, 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
