"use client";

import { useState } from "react";
import { Upload, FileText, X, Download, GripVertical } from "lucide-react";

interface PdfFile {
  id: string;
  file: File;
}

export default function FusionnerPDF() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const pdfs = Array.from(fileList).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs.map((file) => ({ id: crypto.randomUUID(), file }))]);
    setResultUrl(null);
    setError(null);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function move(index: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function merge() {
    if (files.length < 2) {
      setError("Ajoutez au moins deux fichiers PDF à fusionner.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();
      for (const { file } of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((p) => mergedPdf.addPage(p));
      }
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError("Une erreur est survenue lors de la fusion. Vérifiez que vos fichiers sont bien des PDF valides.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line px-6 py-10 text-center transition-colors hover:border-brand-400 dark:border-line-dark">
        <Upload size={22} className="text-muted dark:text-muted-dark" />
        <span className="text-sm font-semibold text-ink dark:text-ink-dark">
          Cliquez pour choisir des fichiers PDF
        </span>
        <span className="text-xs text-muted dark:text-muted-dark">ou glissez-déposez ici</span>
        <input
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, index) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded border border-line px-3 py-2.5 text-sm dark:border-line-dark"
            >
              <GripVertical size={14} className="shrink-0 text-muted dark:text-muted-dark" />
              <FileText size={16} className="shrink-0 text-brand-600 dark:text-brand-300" />
              <span className="flex-1 truncate">{f.file.name}</span>
              <button type="button" onClick={() => move(index, -1)} className="text-xs text-muted hover:text-ink dark:text-muted-dark">
                ↑
              </button>
              <button type="button" onClick={() => move(index, 1)} className="text-xs text-muted hover:text-ink dark:text-muted-dark">
                ↓
              </button>
              <button type="button" onClick={() => removeFile(f.id)} aria-label="Retirer">
                <X size={15} className="text-muted hover:text-red-500 dark:text-muted-dark" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={merge} disabled={busy || files.length < 2} className="btn-primary">
          {busy ? "Fusion en cours…" : "Fusionner les PDF"}
        </button>
        {resultUrl && (
          <a href={resultUrl} download="document-fusionne.pdf" className="btn-secondary">
            <Download size={15} /> Télécharger le PDF fusionné
          </a>
        )}
      </div>
    </div>
  );
}
