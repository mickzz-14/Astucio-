"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function SalaireHoraire() {
  const [mensuel, setMensuel] = useState(2000);
  const [heuresSemaine, setHeuresSemaine] = useState(35);

  const horaire = useMemo(() => {
    const heuresMensuelles = (heuresSemaine * 52) / 12;
    return heuresMensuelles > 0 ? mensuel / heuresMensuelles : 0;
  }, [mensuel, heuresSemaine]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Salaire mensuel</label>
          <input type="number" value={mensuel} onChange={(e) => setMensuel(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Heures travaillées par semaine</label>
          <input type="number" value={heuresSemaine} onChange={(e) => setHeuresSemaine(Number(e.target.value) || 0)} className="input" />
        </div>
      </div>
      <div className="readout flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">Taux horaire</p>
        <p className="text-3xl font-bold text-signal">{formatCurrency(horaire)}</p>
        <p className="text-xs text-white/40">par heure</p>
      </div>
    </div>
  );
}
