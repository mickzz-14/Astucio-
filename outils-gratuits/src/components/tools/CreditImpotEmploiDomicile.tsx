"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const TAUX_CREDIT = 0.5;

export default function CreditImpotEmploiDomicile() {
  const [depenses, setDepenses] = useState(4000);
  const [premiereAnnee, setPremiereAnnee] = useState(false);
  const [invalidite, setInvalidite] = useState(false);
  const [personnes, setPersonnes] = useState(0);

  const result = useMemo(() => {
    let plafond: number;
    if (invalidite) {
      plafond = 20000;
    } else {
      const base = premiereAnnee ? 15000 : 12000;
      const max = premiereAnnee ? 18000 : 15000;
      plafond = Math.min(base + 1500 * personnes, max);
    }
    const baseRetenue = Math.min(Math.max(depenses, 0), plafond);
    return { plafond, baseRetenue, credit: baseRetenue * TAUX_CREDIT };
  }, [depenses, premiereAnnee, invalidite, personnes]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="depensesDomicile">
            Dépenses annuelles pour l&apos;emploi à domicile (€)
          </label>
          <input
            id="depensesDomicile"
            type="number"
            min={0}
            value={depenses}
            onChange={(e) => setDepenses(Number(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div>
          <label className="label" htmlFor="personnesCharge">
            Enfants ou ascendants à charge (+1 500 € de plafond chacun)
          </label>
          <input
            id="personnesCharge"
            type="number"
            min={0}
            max={10}
            value={personnes}
            onChange={(e) =>
              setPersonnes(Math.min(10, Math.max(0, Math.floor(Number(e.target.value) || 0))))
            }
            className="input"
          />
        </div>

        <div>
          <span className="label">Situation particulière</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPremiereAnnee((v) => !v)}
              className={premiereAnnee ? "btn-primary" : "btn-secondary"}
            >
              1re année d&apos;emploi direct
            </button>
            <button
              type="button"
              onClick={() => setInvalidite((v) => !v)}
              className={invalidite ? "btn-primary" : "btn-secondary"}
            >
              Invalidité ou handicap
            </button>
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Crédit d&apos;impôt estimé</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.credit)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Plafond applicable</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.plafond)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Dépenses retenues</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.baseRetenue)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
