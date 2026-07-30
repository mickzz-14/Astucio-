"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

const units: Record<string, number> = {
  "mètre carré": 1,
  "kilomètre carré": 1000000,
  "centimètre carré": 0.0001,
  hectare: 10000,
  are: 100,
  "pied carré": 0.092903,
  acre: 4046.86,
};

export default function ConvertisseurSurface() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("mètre carré");
  const [to, setTo] = useState("hectare");

  const result = useMemo(() => (value * units[from]) / units[to], [value, from, to]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
      <div>
        <label className="label">De</label>
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value) || 0)} className="input mb-2" />
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="input">
          {Object.keys(units).map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center pb-2 text-muted dark:text-muted-dark sm:pt-8">→</div>
      <div>
        <label className="label">Vers</label>
        <div className="input mb-2 flex items-center font-mono font-semibold text-brand-600 dark:text-brand-300">
          {formatNumber(result, 4)}
        </div>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="input">
          {Object.keys(units).map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
