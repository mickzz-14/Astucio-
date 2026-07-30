"use client";

import { useEffect, useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

const devisesCourantes = ["EUR", "USD", "GBP", "CHF", "CAD", "JPY", "CNY", "AUD"];

// Taux de secours utilisés uniquement si l'appel réseau échoue (approximatifs, base EUR).
const fallbackRates: Record<string, number> = {
  EUR: 1, USD: 1.08, GBP: 0.84, CHF: 0.95, CAD: 1.47, JPY: 163, CNY: 7.75, AUD: 1.62,
};

export default function ConvertisseurDevises() {
  const [montant, setMontant] = useState(100);
  const [de, setDe] = useState("EUR");
  const [vers, setVers] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);
  const [status, setStatus] = useState<"loading" | "live" | "fallback">("loading");

  useEffect(() => {
    let cancelled = false;
    async function fetchRates() {
      try {
        const res = await fetch("https://api.frankfurter.dev/v1/latest?from=EUR");
        if (!res.ok) throw new Error("network");
        const data = await res.json();
        if (!cancelled && data?.rates) {
          setRates({ EUR: 1, ...data.rates });
          setStatus("live");
        }
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    }
    fetchRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const result = useMemo(() => {
    const rateDe = rates[de] ?? 1;
    const rateVers = rates[vers] ?? 1;
    const enEur = montant / rateDe;
    return enEur * rateVers;
  }, [montant, de, vers, rates]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="label">Montant</label>
          <input type="number" value={montant} onChange={(e) => setMontant(Number(e.target.value) || 0)} className="input mb-2" />
          <select value={de} onChange={(e) => setDe(e.target.value)} className="input">
            {devisesCourantes.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center pb-2 text-muted dark:text-muted-dark sm:pt-8">→</div>
        <div>
          <label className="label">Résultat</label>
          <div className="input mb-2 flex items-center font-mono font-semibold text-brand-600 dark:text-brand-300">
            {formatNumber(result, 2)}
          </div>
          <select value={vers} onChange={(e) => setVers(e.target.value)} className="input">
            {devisesCourantes.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-muted dark:text-muted-dark">
        {status === "live"
          ? "Taux de change en temps réel (source : Frankfurter/Banque centrale européenne)."
          : "Taux de change indicatifs (connexion au service de taux impossible pour le moment)."}
      </p>
    </div>
  );
}
