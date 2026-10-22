"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function RemiseSolde() {
  const [prix, setPrix] = useState(120);
  const [remise1, setRemise1] = useState(30);
  const [remise2, setRemise2] = useState(0);

  const result = useMemo(() => {
    const r1 = Math.min(Math.max(remise1, 0), 100);
    const r2 = Math.min(Math.max(remise2, 0), 100);
    const final = prix * (1 - r1 / 100) * (1 - r2 / 100);
    const economie = prix - final;
    return {
      final,
      economie,
      remiseTotale: prix > 0 ? (economie / prix) * 100 : 0,
    };
  }, [prix, remise1, remise2]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="remisePrix">
            Prix initial (€)
          </label>
          <input
            id="remisePrix"
            type="number"
            min={0}
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="remise1">
              Remise (%)
            </label>
            <input
              id="remise1"
              type="number"
              min={0}
              max={100}
              value={remise1}
              onChange={(e) => setRemise1(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="remise2">
              2e démarque (%)
            </label>
            <input
              id="remise2"
              type="number"
              min={0}
              max={100}
              value={remise2}
              onChange={(e) => setRemise2(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Prix final</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.final)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Vous économisez</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.economie)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Remise réelle</p>
            <p className="text-lg font-semibold text-white">
              {result.remiseTotale.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
