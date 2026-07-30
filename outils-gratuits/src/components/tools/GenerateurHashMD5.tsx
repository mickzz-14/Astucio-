"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { md5 } from "@/lib/md5";

export default function GenerateurHashMD5() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const hash = useMemo(() => (input ? md5(input) : ""), [input]);

  async function copy() {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="label">Texte à hasher</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="input resize-none" />
      </div>

      <div>
        <label className="label">Empreinte MD5</label>
        <div className="readout min-h-[3rem] break-all p-4 font-mono text-sm">{hash || "—"}</div>
      </div>

      {hash && (
        <button type="button" onClick={copy} className="btn-primary">
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copié" : "Copier le hash"}
        </button>
      )}

      <p className="text-xs text-muted dark:text-muted-dark">
        MD5 est un algorithme de hachage rapide, utile pour vérifier l&apos;intégrité de fichiers ou de textes, mais il n&apos;est plus recommandé à des fins de sécurité cryptographique.
      </p>
    </div>
  );
}
