"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function ConsommationElectrique() {
  const [puissance, setPuissance] = useState(150);
  const [heuresParJour, setHeuresParJour] = useState(4);
  const [prixKwh, setPrixKwh] = useState(0.2516);

  const result = useMemo(() => {
    const kwhParJour = (puissance * heuresParJour) / 1000;
    const kwhParMois = kwhParJour * 30;
    const kwhParAn = kwhParJour * 365;
    return {
      kwhParJour,
      coutJour: kwhParJour * prixKwh,
      coutMois: kwhParMois * prixKwh,
      coutAn: kwhParAn * prixKwh,
    };
  }, [puissance, heuresParJour, prixKwh]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Puissance de l&apos;appareil (Watts)</label>
          <input type="number" value={puissance} onChange={(e) => setPuissance(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Heures d&apos;utilisation par jour</label>
          <input type="number" value={heuresParJour} onChange={(e) => setHeuresParJour(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Prix du kWh (€)</label>
          <input type="number" step={0.001} value={prixKwh} onChange={(e) => setPrixKwh(Number(e.target.value) || 0)} className="input" />
        </div>
      </div>
      <div className="readout flex flex-col gap-4 p-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Coût mensuel estimé</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.coutMois)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Par jour</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.coutJour)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Par an</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.coutAn)}</p>
          </div>
        </div>
        <p className="text-center text-xs text-white/40">
          Consommation : {formatNumber(result.kwhParJour, 2)} kWh/jour
        </p>
      </div>
    </div>
  );
}
