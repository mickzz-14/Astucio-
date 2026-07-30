"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

export default function GenerateurUUID() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, () => crypto.randomUUID()));
  const [copied, setCopied] = useState(false);

  function regenerate() {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
  }

  async function copyAll() {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="label">Nombre d&apos;UUID</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="input w-24"
          />
        </div>
        <button type="button" onClick={regenerate} className="btn-secondary">
          <RefreshCw size={14} /> Générer
        </button>
        <button type="button" onClick={copyAll} className="btn-primary ml-auto">
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copié" : "Copier tout"}
        </button>
      </div>

      <div className="readout max-h-80 space-y-1 overflow-auto p-4 font-mono text-sm">
        {uuids.map((u, i) => (
          <div key={i}>{u}</div>
        ))}
      </div>
    </div>
  );
}
