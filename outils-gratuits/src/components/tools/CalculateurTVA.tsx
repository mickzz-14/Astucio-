"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const taux = [20, 10, 5.5, 2.1];

export default function CalculateurTVA() {
  const [montant, setMontant] = useState(100);
  const [sens, setSens] = useState<"HT" | "TTC">("HT");
  const [tauxTVA, setTauxTVA] = useState(20);

  const result = useMemo(() => {
    if (sens === "HT") {
      const ttc = montant * (1 + tauxTVA / 100);
      return { ht: montant, ttc, tva: ttc - montant };
    }
    const ht = montant / (1 + tauxTVA / 100);
    return { ht, ttc: montant, tva: montant - ht };
  }, [montant, sens, tauxTVA]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <span className="label">Je saisis un montant</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSens("HT")}
              className={sens === "HT" ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              Hors taxes (HT)
            </button>
            <button
              type="button"
              onClick={() => setSens("TTC")}
              className={sens === "TTC" ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              Toutes taxes (TTC)
            </button>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="montantTva">
            Montant {sens}
          </label>
          <input
            id="montantTva"
            type="number"
            value={montant}
            onChange={(e) => setMontant(Number(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div>
          <span className="label">Taux de TVA</span>
          <div className="grid grid-cols-4 gap-2">
            {taux.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTauxTVA(t)}
                className={tauxTVA === t ? "btn-primary" : "btn-secondary"}
              >
                {t}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Prix TTC</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.ttc)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Prix HT</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.ht)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Montant TVA</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.tva)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
