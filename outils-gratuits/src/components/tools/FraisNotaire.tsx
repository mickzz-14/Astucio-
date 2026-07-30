"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function FraisNotaire() {
  const [prix, setPrix] = useState(250000);
  const [type, setType] = useState<"ancien" | "neuf">("ancien");

  const taux = type === "ancien" ? 0.075 : 0.025;
  const frais = useMemo(() => prix * taux, [prix, taux]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Prix du bien</label>
          <input type="number" value={prix} onChange={(e) => setPrix(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <span className="label">Type de bien</span>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setType("ancien")} className={type === "ancien" ? "btn-primary" : "btn-secondary"}>
              Ancien (~7-8 %)
            </button>
            <button type="button" onClick={() => setType("neuf")} className={type === "neuf" ? "btn-primary" : "btn-secondary"}>
              Neuf (~2-3 %)
            </button>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted dark:text-muted-dark">
          Estimation basée sur des taux moyens constatés en France. Les frais de notaire réels varient selon le département et le prix exact du bien.
        </p>
      </div>
      <div className="readout flex flex-col gap-4 p-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Frais de notaire estimés</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(frais)}</p>
        </div>
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Coût total (bien + frais)</p>
          <p className="text-lg font-semibold text-white">{formatCurrency(prix + frais)}</p>
        </div>
      </div>
    </div>
  );
}
