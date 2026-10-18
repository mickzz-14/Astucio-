"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function PrelevementSource() {
  const [netImposable, setNetImposable] = useState(2200);
  const [taux, setTaux] = useState(7.5);

  const result = useMemo(() => {
    const tauxValide = Math.min(Math.max(taux, 0), 100);
    const prelevement = netImposable * (tauxValide / 100);
    return {
      prelevement,
      netApres: netImposable - prelevement,
      annuel: prelevement * 12,
    };
  }, [netImposable, taux]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="netImposableMensuel">
            Salaire net imposable mensuel (€)
          </label>
          <input
            id="netImposableMensuel"
            type="number"
            min={0}
            value={netImposable}
            onChange={(e) => setNetImposable(Number(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div>
          <label className="label" htmlFor="tauxPAS">
            Taux de prélèvement à la source (%)
          </label>
          <input
            id="tauxPAS"
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={taux}
            onChange={(e) => setTaux(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Prélevé chaque mois
          </p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.prelevement)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Net après impôt</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.netApres)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Total sur 12 mois</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.annuel)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
