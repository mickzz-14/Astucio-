"use client";

import { useEffect, useState } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

function generate(length: number, opts: { upper: boolean; digits: boolean; symbols: boolean }) {
  let charset = SETS.lower;
  if (opts.upper) charset += SETS.upper;
  if (opts.digits) charset += SETS.digits;
  if (opts.symbols) charset += SETS.symbols;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += charset[array[i] % charset.length];
  }
  return out;
}

function strength(password: string) {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: "Faible", color: "bg-red-500", width: "33%" };
  if (score <= 4) return { label: "Correct", color: "bg-signal", width: "66%" };
  return { label: "Fort", color: "bg-emerald-500", width: "100%" };
}

export default function GenerateurMotDePasse() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function regenerate() {
    setPassword(generate(length, { upper, digits, symbols }));
    setCopied(false);
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, upper, digits, symbols]);

  async function copy() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const s = strength(password);

  return (
    <div className="space-y-6">
      <div className="readout flex items-center justify-between gap-3 p-5">
        <span className="break-all text-lg font-semibold text-signal">{password}</span>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={regenerate}
            aria-label="Régénérer"
            className="flex h-9 w-9 items-center justify-center rounded border border-white/15 text-white hover:border-white/40"
          >
            <RefreshCw size={15} />
          </button>
          <button
            type="button"
            onClick={copy}
            aria-label="Copier"
            className="flex h-9 w-9 items-center justify-center rounded border border-white/15 text-white hover:border-white/40"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
      </div>

      <div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line dark:bg-line-dark">
          <div className={`h-full ${s.color}`} style={{ width: s.width }} />
        </div>
        <p className="mt-1 text-xs text-muted dark:text-muted-dark">Robustesse : {s.label}</p>
      </div>

      <div>
        <label className="label">Longueur : {length} caractères</label>
        <input
          type="range"
          min={6}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} />
          Majuscules
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={digits} onChange={(e) => setDigits(e.target.checked)} />
          Chiffres
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
          Symboles
        </label>
      </div>
    </div>
  );
}
