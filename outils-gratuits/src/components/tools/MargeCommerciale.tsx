"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const pct = (v: number) =>
  v.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " %";

export default function MargeCommerciale() {
  const [cout, setCout] = useState(60);
  const [prix, setPrix] = useState(100);
  const [cible, setCible] = useState(50);

  const result = useMemo(() => {
    const marge = prix - cout;
    return {
      marge,
      tauxMarge: cout > 0 ? (marge / cout) * 100 : 0,
      tauxMarque: prix > 0 ? (marge / prix) * 100 : 0,
      coefficient: cout > 0 ? prix / cout : 0,
      prixCible: cout * (1 + cible / 100),
    };
  }, [cout, prix, cible]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="margeCout">
            Coût d&apos;achat HT (€)
          </label>
          <input
            id="margeCout"
            type="number"
            min={0}
            value={cout}
            onChange={(e) => setCout(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="margePrix">
            Prix de vente HT (€)
          </label>
          <input
            id="margePrix"
            type="number"
            min={0}
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="margeCible">
            Taux de marge visé (%)
          </label>
          <input
            id="margeCible"
            type="number"
            min={0}
            value={cible}
            onChange={(e) => setCible(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Marge brute</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.marge)}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Taux de marge</p>
            <p className="text-lg font-semibold text-white">{pct(result.tauxMarge)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Taux de marque</p>
            <p className="text-lg font-semibold text-white">{pct(result.tauxMarque)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Coefficient</p>
            <p className="text-lg font-semibold text-white">
              {result.coefficient.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs uppercase tracking-widest text-white/50">
            Prix de vente HT pour {pct(cible)} de marge
          </p>
          <p className="text-lg font-semibold text-white">{formatCurrency(result.prixCible)}</p>
        </div>
      </div>
    </div>
  );
}
