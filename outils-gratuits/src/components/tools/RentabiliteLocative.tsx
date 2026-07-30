"use client";

import { useMemo, useState } from "react";
import { formatNumber, formatCurrency } from "@/lib/utils";

export default function RentabiliteLocative() {
  const [prixAchat, setPrixAchat] = useState(200000);
  const [loyerMensuel, setLoyerMensuel] = useState(800);
  const [chargesAnnuelles, setChargesAnnuelles] = useState(1500);

  const result = useMemo(() => {
    const loyerAnnuel = loyerMensuel * 12;
    const brute = prixAchat > 0 ? (loyerAnnuel / prixAchat) * 100 : 0;
    const nette = prixAchat > 0 ? ((loyerAnnuel - chargesAnnuelles) / prixAchat) * 100 : 0;
    return { loyerAnnuel, brute, nette };
  }, [prixAchat, loyerMensuel, chargesAnnuelles]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Prix d&apos;achat (frais inclus)</label>
          <input type="number" value={prixAchat} onChange={(e) => setPrixAchat(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Loyer mensuel (hors charges)</label>
          <input type="number" value={loyerMensuel} onChange={(e) => setLoyerMensuel(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Charges annuelles (taxe foncière, copropriété, assurance…)</label>
          <input type="number" value={chargesAnnuelles} onChange={(e) => setChargesAnnuelles(Number(e.target.value) || 0)} className="input" />
        </div>
      </div>
      <div className="readout flex flex-col gap-4 p-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Rentabilité brute</p>
          <p className="text-3xl font-bold text-signal">{formatNumber(result.brute, 2)} %</p>
        </div>
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Rentabilité nette</p>
          <p className="text-lg font-semibold text-white">{formatNumber(result.nette, 2)} %</p>
          <p className="mt-1 text-xs text-white/40">Loyer annuel : {formatCurrency(result.loyerAnnuel)}</p>
        </div>
      </div>
    </div>
  );
}
