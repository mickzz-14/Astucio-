"use client";

import { useMemo, useState } from "react";

function fmt(n: number): string {
  const arrondi = Math.round(n * 1e6) / 1e6;
  return (Object.is(arrondi, -0) ? 0 : arrondi).toLocaleString("fr-FR", {
    maximumFractionDigits: 6,
  });
}

export default function EquationSecondDegre() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);

  const result = useMemo(() => {
    if (a === 0) {
      if (b === 0) return { type: "aucune" as const };
      return { type: "lineaire" as const, x: -c / b };
    }
    const delta = b * b - 4 * a * c;
    if (delta > 0) {
      const racine = Math.sqrt(delta);
      return {
        type: "deux" as const,
        delta,
        x1: (-b - racine) / (2 * a),
        x2: (-b + racine) / (2 * a),
      };
    }
    if (delta === 0) return { type: "double" as const, delta, x: -b / (2 * a) };
    return {
      type: "complexe" as const,
      delta,
      reel: -b / (2 * a),
      imaginaire: Math.sqrt(-delta) / (2 * Math.abs(a)),
    };
  }, [a, b, c]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <p className="text-sm text-slate-500">Équation de la forme ax² + bx + c = 0</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label" htmlFor="eqA">
              a
            </label>
            <input
              id="eqA"
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="eqB">
              b
            </label>
            <input
              id="eqB"
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="eqC">
              c
            </label>
            <input
              id="eqC"
              type="number"
              value={c}
              onChange={(e) => setC(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-4 p-6">
        {result.type === "aucune" && (
          <p className="text-white/60">Avec a = 0 et b = 0, il n&apos;y a pas d&apos;équation à résoudre.</p>
        )}
        {result.type === "lineaire" && (
          <>
            <p className="text-xs uppercase tracking-widest text-white/50">
              a = 0 : équation du premier degré
            </p>
            <p className="text-3xl font-bold text-signal">x = {fmt(result.x)}</p>
          </>
        )}
        {result.type === "deux" && (
          <>
            <p className="text-xs uppercase tracking-widest text-white/50">
              Discriminant Δ = {fmt(result.delta)} : deux solutions réelles
            </p>
            <p className="text-3xl font-bold text-signal">x₁ = {fmt(result.x1)}</p>
            <p className="text-3xl font-bold text-signal">x₂ = {fmt(result.x2)}</p>
          </>
        )}
        {result.type === "double" && (
          <>
            <p className="text-xs uppercase tracking-widest text-white/50">
              Discriminant Δ = 0 : une solution double
            </p>
            <p className="text-3xl font-bold text-signal">x = {fmt(result.x)}</p>
          </>
        )}
        {result.type === "complexe" && (
          <>
            <p className="text-xs uppercase tracking-widest text-white/50">
              Discriminant Δ = {fmt(result.delta)} : aucune solution réelle
            </p>
            <p className="text-lg font-semibold text-white">
              Solutions complexes : {fmt(result.reel)} ± {fmt(result.imaginaire)}i
            </p>
          </>
        )}
      </div>
    </div>
  );
}
