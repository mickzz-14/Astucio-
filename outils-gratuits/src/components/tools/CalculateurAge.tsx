"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function CalculateurAge() {
  const [naissance, setNaissance] = useState("2000-01-01");
  const [reference, setReference] = useState(todayStr());

  const result = useMemo(() => {
    const start = new Date(naissance);
    const end = new Date(reference);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return null;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }, [naissance, reference]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="naissance">
            Date de naissance
          </label>
          <input
            id="naissance"
            type="date"
            value={naissance}
            onChange={(e) => setNaissance(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="reference">
            Date de référence
          </label>
          <input
            id="reference"
            type="date"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-4 p-6">
        {result ? (
          <>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">Âge exact</p>
              <p className="text-2xl font-bold text-signal">
                {result.years} ans, {result.months} mois, {result.days} jours
              </p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-widest text-white/50">Jours vécus</p>
              <p className="text-lg font-semibold text-white">{formatNumber(result.totalDays, 0)} jours</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-white/60">
            Vérifiez que la date de naissance précède la date de référence.
          </p>
        )}
      </div>
    </div>
  );
}
