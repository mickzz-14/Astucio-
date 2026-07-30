"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function CalculateurInteretsComposes() {
  const [capital, setCapital] = useState(10000);
  const [taux, setTaux] = useState(5);
  const [duree, setDuree] = useState(10);
  const [versement, setVersement] = useState(100);

  const result = useMemo(() => {
    const i = taux / 100 / 12;
    const n = duree * 12;
    let total = capital;
    let totalVerse = capital;
    for (let m = 0; m < n; m++) {
      total = total * (1 + i) + versement;
      totalVerse += versement;
    }
    return { total, totalVerse, interets: total - totalVerse };
  }, [capital, taux, duree, versement]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="capital">
            Capital initial
          </label>
          <input
            id="capital"
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="versement">
            Versement mensuel
          </label>
          <input
            id="versement"
            type="number"
            value={versement}
            onChange={(e) => setVersement(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="taux2">
            Taux de rendement annuel (%)
          </label>
          <input
            id="taux2"
            type="number"
            step={0.1}
            value={taux}
            onChange={(e) => setTaux(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="duree2">
            Durée (années)
          </label>
          <input
            id="duree2"
            type="number"
            value={duree}
            onChange={(e) => setDuree(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Capital final</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.total)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Total versé</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.totalVerse)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Intérêts gagnés</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.interets)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
