"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function EncodeurBase64() {
  const [mode, setMode] = useState<"encoder" | "decoder">("encoder");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  let output = "";
  let error = "";
  try {
    output = mode === "encoder" ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input)));
  } catch {
    error = "Le texte fourni n'est pas un Base64 valide.";
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setMode("encoder")} className={mode === "encoder" ? "btn-primary" : "btn-secondary"}>
          Encoder (texte → Base64)
        </button>
        <button type="button" onClick={() => setMode("decoder")} className={mode === "decoder" ? "btn-primary" : "btn-secondary"}>
          Décoder (Base64 → texte)
        </button>
      </div>

      <div>
        <label className="label">{mode === "encoder" ? "Texte à encoder" : "Base64 à décoder"}</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="input resize-none" />
      </div>

      <div>
        <label className="label">Résultat</label>
        <div className="readout min-h-[3rem] whitespace-pre-wrap break-all p-4 font-mono text-sm">
          {error ? <span className="text-red-400">{error}</span> : output}
        </div>
      </div>

      {output && !error && (
        <button type="button" onClick={copy} className="btn-primary">
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copié" : "Copier le résultat"}
        </button>
      )}
    </div>
  );
}
