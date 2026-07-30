"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

export default function RegleDeTrois() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(9);
  const [c, setC] = useState(5);

  const x = useMemo(() => (a !== 0 ? (b * c) / a : 0), [a, b, c]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <p className="text-sm text-muted dark:text-muted-dark">
          Si <strong className="text-ink dark:text-ink-dark">A</strong> correspond à{" "}
          <strong className="text-ink dark:text-ink-dark">B</strong>, à combien correspond{" "}
          <strong className="text-ink dark:text-ink-dark">C</strong> ?
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">A</label>
            <input type="number" value={a} onChange={(e) => setA(Number(e.target.value) || 0)} className="input" />
          </div>
          <div>
            <label className="label">B</label>
            <input type="number" value={b} onChange={(e) => setB(Number(e.target.value) || 0)} className="input" />
          </div>
          <div>
            <label className="label">C</label>
            <input type="number" value={c} onChange={(e) => setC(Number(e.target.value) || 0)} className="input" />
          </div>
        </div>
      </div>
      <div className="readout flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">
          X (correspondant à C)
        </p>
        <p className="text-3xl font-bold text-signal">{formatNumber(x, 4)}</p>
      </div>
    </div>
  );
}
