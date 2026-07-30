"use client";

import { useMemo, useState } from "react";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function SimplificateurFraction() {
  const [numerateur, setNumerateur] = useState(24);
  const [denominateur, setDenominateur] = useState(36);

  const result = useMemo(() => {
    if (denominateur === 0) return null;
    const diviseur = gcd(Math.abs(numerateur), Math.abs(denominateur)) || 1;
    const num = numerateur / diviseur;
    const den = denominateur / diviseur;
    return { num, den, decimal: denominateur !== 0 ? numerateur / denominateur : 0 };
  }, [numerateur, denominateur]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Numérateur</label>
          <input type="number" value={numerateur} onChange={(e) => setNumerateur(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <label className="label">Dénominateur</label>
          <input type="number" value={denominateur} onChange={(e) => setDenominateur(Number(e.target.value) || 0)} className="input" />
        </div>
      </div>
      <div className="readout flex flex-col items-center justify-center gap-3 p-6 text-center">
        {result ? (
          <>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">Fraction simplifiée</p>
              <p className="text-3xl font-bold text-signal">
                {result.num} / {result.den}
              </p>
            </div>
            <p className="text-sm text-white/60">≈ {result.decimal.toFixed(4)}</p>
          </>
        ) : (
          <p className="text-sm text-white/60">Le dénominateur ne peut pas être zéro.</p>
        )}
      </div>
    </div>
  );
}
