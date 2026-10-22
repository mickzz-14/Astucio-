"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function CapaciteEmprunt() {
  const [revenus, setRevenus] = useState(3500);
  const [charges, setCharges] = useState(0);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(25);
  const [assurance, setAssurance] = useState(0.3);
  const [apport, setApport] = useState(20000);
  const [endettement, setEndettement] = useState(35);

  const result = useMemo(() => {
    const mensualiteMax = Math.max(0, revenus * (endettement / 100) - charges);
    const n = Math.round(Math.min(Math.max(duree, 1), 40) * 12);
    const i = Math.max(taux, 0) / 100 / 12;
    const a = Math.max(assurance, 0) / 100 / 12;
    const coefPret = i === 0 ? 1 / n : i / (1 - Math.pow(1 + i, -n));
    const capital = mensualiteMax / (coefPret + a);
    return { mensualiteMax, capital, budget: capital + Math.max(apport, 0) };
  }, [revenus, charges, taux, duree, assurance, apport, endettement]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="empRevenus">
            Revenus nets mensuels du foyer (€)
          </label>
          <input
            id="empRevenus"
            type="number"
            min={0}
            value={revenus}
            onChange={(e) => setRevenus(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="empCharges">
            Crédits en cours, mensualités totales (€)
          </label>
          <input
            id="empCharges"
            type="number"
            min={0}
            value={charges}
            onChange={(e) => setCharges(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="empTaux">
              Taux du prêt (%)
            </label>
            <input
              id="empTaux"
              type="number"
              min={0}
              step={0.01}
              value={taux}
              onChange={(e) => setTaux(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="empDuree">
              Durée (années)
            </label>
            <input
              id="empDuree"
              type="number"
              min={1}
              max={40}
              value={duree}
              onChange={(e) => setDuree(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="empAssurance">
              Assurance (% par an)
            </label>
            <input
              id="empAssurance"
              type="number"
              min={0}
              step={0.01}
              value={assurance}
              onChange={(e) => setAssurance(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="empEndettement">
              Endettement max (%)
            </label>
            <input
              id="empEndettement"
              type="number"
              min={1}
              max={50}
              value={endettement}
              onChange={(e) => setEndettement(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="empApport">
            Apport personnel (€)
          </label>
          <input
            id="empApport"
            type="number"
            min={0}
            value={apport}
            onChange={(e) => setApport(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Capacité d&apos;emprunt</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.capital)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Mensualité max</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.mensualiteMax)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Budget avec apport</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.budget)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
