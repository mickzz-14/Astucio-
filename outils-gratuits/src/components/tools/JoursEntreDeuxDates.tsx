"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function JoursEntreDeuxDates() {
  const [date1, setDate1] = useState(todayStr());
  const [date2, setDate2] = useState(todayStr());

  const result = useMemo(() => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const jours = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return { jours, semaines: jours / 7, mois: jours / 30.44 };
  }, [date1, date2]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Première date</label>
          <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="input" />
        </div>
        <div>
          <label className="label">Deuxième date</label>
          <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="input" />
        </div>
      </div>
      <div className="readout flex flex-col gap-4 p-6">
        {result ? (
          <>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-white/50">Jours entre les deux dates</p>
              <p className="text-3xl font-bold text-signal">{formatNumber(result.jours, 0)} jours</p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Semaines</p>
                <p className="text-sm font-semibold text-white">{formatNumber(result.semaines, 1)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Mois (approx.)</p>
                <p className="text-sm font-semibold text-white">{formatNumber(result.mois, 1)}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-white/60">Sélectionnez deux dates valides.</p>
        )}
      </div>
    </div>
  );
}
