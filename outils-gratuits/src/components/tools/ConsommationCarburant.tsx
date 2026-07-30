"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function ConsommationCarburant() {
  const [distance, setDistance] = useState(500);
  const [consommation, setConsommation] = useState(6.5);
  const [prixLitre, setPrixLitre] = useState(1.85);

  const result = useMemo(() => {
    const litres = (distance / 100) * consommation;
    const cout = litres * prixLitre;
    return { litres, cout };
  }, [distance, consommation, prixLitre]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Distance du trajet (km)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Consommation moyenne (L/100km)</label>
          <input type="number" step={0.1} value={consommation} onChange={(e) => setConsommation(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Prix du carburant (€/L)</label>
          <input type="number" step={0.01} value={prixLitre} onChange={(e) => setPrixLitre(Number(e.target.value) || 0)} className="input" />
        </div>
      </div>
      <div className="readout flex flex-col gap-4 p-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Coût total du trajet</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.cout)}</p>
        </div>
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Carburant nécessaire</p>
          <p className="text-lg font-semibold text-white">{formatNumber(result.litres, 1)} L</p>
        </div>
      </div>
    </div>
  );
}
