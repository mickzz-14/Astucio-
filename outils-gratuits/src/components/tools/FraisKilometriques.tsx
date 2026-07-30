"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

// Barème kilométrique fiscal français (structure officielle par tranche de CV et de distance).
type Bareme = (d: number) => number;
const baremes: Record<string, Bareme> = {
  "3 CV et moins": (d) => (d <= 5000 ? d * 0.529 : d <= 20000 ? d * 0.316 + 1065 : d * 0.37),
  "4 CV": (d) => (d <= 5000 ? d * 0.606 : d <= 20000 ? d * 0.34 + 1330 : d * 0.407),
  "5 CV": (d) => (d <= 5000 ? d * 0.636 : d <= 20000 ? d * 0.357 + 1395 : d * 0.427),
  "6 CV": (d) => (d <= 5000 ? d * 0.665 : d <= 20000 ? d * 0.374 + 1457 : d * 0.447),
  "7 CV et plus": (d) => (d <= 5000 ? d * 0.697 : d <= 20000 ? d * 0.394 + 1515 : d * 0.470),
};

export default function FraisKilometriques() {
  const [distance, setDistance] = useState(8000);
  const [puissance, setPuissance] = useState<keyof typeof baremes>("5 CV");

  const montant = useMemo(() => baremes[puissance](distance), [distance, puissance]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Distance professionnelle annuelle (km)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <span className="label">Puissance fiscale du véhicule</span>
          <select value={puissance} onChange={(e) => setPuissance(e.target.value as keyof typeof baremes)} className="input">
            {Object.keys(baremes).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs leading-relaxed text-muted dark:text-muted-dark">
          Calcul basé sur le barème kilométrique fiscal indicatif. Le barème officiel est publié chaque année par l&apos;administration fiscale et peut légèrement varier.
        </p>
      </div>
      <div className="readout flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">Frais déductibles estimés</p>
        <p className="text-3xl font-bold text-signal">{formatCurrency(montant)}</p>
      </div>
    </div>
  );
}
