"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

function abattementIR(annees: number) {
  if (annees <= 5) return 0;
  if (annees >= 22) return 100;
  return (annees - 5) * 6;
}

function abattementPS(annees: number) {
  if (annees <= 5) return 0;
  if (annees >= 30) return 100;
  if (annees <= 21) return (annees - 5) * 1.65;
  return 16 * 1.65 + (annees - 21) * 1.6 + 9;
}

export default function PlusValueImmobiliere() {
  const [prixAchat, setPrixAchat] = useState(180000);
  const [prixVente, setPrixVente] = useState(250000);
  const [annees, setAnnees] = useState(10);

  const result = useMemo(() => {
    const plusValueBrute = Math.max(0, prixVente - prixAchat);
    const abIR = Math.min(100, abattementIR(annees));
    const abPS = Math.min(100, abattementPS(annees));
    const baseIR = plusValueBrute * (1 - abIR / 100);
    const basePS = plusValueBrute * (1 - abPS / 100);
    const impotIR = baseIR * 0.19;
    const prelevementsSociaux = basePS * 0.172;
    return { plusValueBrute, impotIR, prelevementsSociaux, total: impotIR + prelevementsSociaux };
  }, [prixAchat, prixVente, annees]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Prix d&apos;achat</label>
          <input type="number" value={prixAchat} onChange={(e) => setPrixAchat(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Prix de vente</label>
          <input type="number" value={prixVente} onChange={(e) => setPrixVente(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Durée de détention (années) : {annees}</label>
          <input type="range" min={0} max={30} value={annees} onChange={(e) => setAnnees(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>
        <p className="text-xs leading-relaxed text-muted dark:text-muted-dark">
          Estimation simplifiée pour une résidence secondaire (la résidence principale est exonérée). Abattements pour durée de détention appliqués selon le barème français en vigueur.
        </p>
      </div>
      <div className="readout flex flex-col gap-4 p-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Impôt + prélèvements estimés</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.total)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Plus-value brute</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.plusValueBrute)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Dont IR (19 %)</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.impotIR)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
