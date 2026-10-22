"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const pourboires = [0, 5, 10, 15, 20];

export default function PourboireAddition() {
  const [addition, setAddition] = useState(80);
  const [pourboire, setPourboire] = useState(10);
  const [personnes, setPersonnes] = useState(4);

  const result = useMemo(() => {
    const nb = Math.max(1, personnes);
    const montantPourboire = addition * (pourboire / 100);
    const total = addition + montantPourboire;
    return { montantPourboire, total, parPersonne: total / nb };
  }, [addition, pourboire, personnes]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="additionMontant">
            Montant de l&apos;addition (€)
          </label>
          <input
            id="additionMontant"
            type="number"
            min={0}
            value={addition}
            onChange={(e) => setAddition(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <span className="label">Pourboire</span>
          <div className="grid grid-cols-5 gap-2">
            {pourboires.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPourboire(p)}
                className={pourboire === p ? "btn-primary" : "btn-secondary"}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="label" htmlFor="additionPersonnes">
            Nombre de personnes
          </label>
          <input
            id="additionPersonnes"
            type="number"
            min={1}
            value={personnes}
            onChange={(e) =>
              setPersonnes(Math.min(100, Math.max(1, Math.floor(Number(e.target.value) || 1))))
            }
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Par personne</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.parPersonne)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Pourboire</p>
            <p className="text-lg font-semibold text-white">
              {formatCurrency(result.montantPourboire)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Total à payer</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
