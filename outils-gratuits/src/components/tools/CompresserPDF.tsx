"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";

export default function CompresserPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function compress() {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      const optimized = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([optimized], { type: "application/pdf" });
      setBefore(file.size);
      setAfter(blob.size);
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError("Impossible de traiter ce fichier. Vérifiez qu'il s'agit bien d'un PDF valide.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line px-6 py-10 text-center transition-colors hover:border-brand-400 dark:border-line-dark">
        <Upload size={22} className="text-muted dark:text-muted-dark" />
        <span className="text-sm font-semibold text-ink dark:text-ink-dark">Cliquez pour choisir un PDF</span>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setResultUrl(null);
          }}
        />
      </label>

      {file && (
        <>
          <button type="button" onClick={compress} disabled={busy} className="btn-primary">
            {busy ? "Compression…" : "Compresser le PDF"}
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {resultUrl && (
            <div className="card p-4 text-sm">
              <p className="mb-3 text-muted dark:text-muted-dark">
                Avant : {(before / 1024).toFixed(0)} Ko · Après : {(after / 1024).toFixed(0)} Ko
                {after < before ? ` (${Math.round((1 - after / before) * 100)}% de gain)` : ""}
              </p>
              <a href={resultUrl} download="document-compresse.pdf" className="btn-secondary">
                <Download size={15} /> Télécharger
              </a>
            </div>
          )}
          <p className="text-xs text-muted dark:text-muted-dark">
            Le gain dépend fortement du contenu du PDF (métadonnées, structure interne). Pour les PDF contenant beaucoup d&apos;images, le gain peut être limité.
          </p>
        </>
      )}
    </div>
  );
}
