"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function CalculateurCredit() {
  const [montant, setMontant] = useState(200000);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(20);

  const result = useMemo(() => {
    const n = duree * 12;
    const i = taux / 100 / 12;
    if (n <= 0) return { mensualite: 0, coutTotal: 0, interets: 0 };
    const mensualite = i === 0 ? montant / n : (montant * i) / (1 - Math.pow(1 + i, -n));
    const coutTotal = mensualite * n;
    const interets = coutTotal - montant;
    return { mensualite, coutTotal, interets };
  }, [montant, taux, duree]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="montant">
            Montant emprunté
          </label>
          <div className="flex items-center gap-3">
            <input
              id="montant"
              type="range"
              min={5000}
              max={800000}
              step={1000}
              value={montant}
              onChange={(e) => setMontant(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(Number(e.target.value) || 0)}
              className="input w-32 shrink-0"
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="taux">
            Taux d&apos;intérêt annuel (%)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="taux"
              type="range"
              min={0}
              max={10}
              step={0.05}
              value={taux}
              onChange={(e) => setTaux(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <input
              type="number"
              step={0.05}
              value={taux}
              onChange={(e) => setTaux(Number(e.target.value) || 0)}
              className="input w-32 shrink-0"
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="duree">
            Durée (années)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="duree"
              type="range"
              min={1}
              max={30}
              step={1}
              value={duree}
              onChange={(e) => setDuree(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <input
              type="number"
              value={duree}
              onChange={(e) => setDuree(Number(e.target.value) || 0)}
              className="input w-32 shrink-0"
            />
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Mensualité estimée</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.mensualite)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Coût total</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.coutTotal)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Intérêts totaux</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.interets)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
