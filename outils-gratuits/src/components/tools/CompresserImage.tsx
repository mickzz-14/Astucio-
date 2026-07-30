"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function CompresserImage() {
  const [original, setOriginal] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File | null) {
    if (!file) return;
    setOriginal(file);
    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setResultSize(null);
  }

  async function compress() {
    if (!original) return;
    setBusy(true);
    try {
      const img = await loadImage(original);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setResultUrl(URL.createObjectURL(blob));
          setResultSize(blob.size);
          setBusy(false);
        },
        "image/jpeg",
        quality
      );
    } catch {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line px-6 py-10 text-center transition-colors hover:border-brand-400 dark:border-line-dark">
        <Upload size={22} className="text-muted dark:text-muted-dark" />
        <span className="text-sm font-semibold text-ink dark:text-ink-dark">
          Cliquez pour choisir une image
        </span>
        <span className="text-xs text-muted dark:text-muted-dark">JPG, PNG ou WEBP</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </label>

      {original && (
        <>
          <div>
            <label className="label">Qualité : {Math.round(quality * 100)}%</label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>

          <button type="button" onClick={compress} disabled={busy} className="btn-primary">
            {busy ? "Compression…" : "Compresser l'image"}
          </button>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {originalUrl && (
              <div className="card p-3">
                <p className="mb-2 text-xs font-semibold uppercase text-muted dark:text-muted-dark">
                  Avant · {(original.size / 1024).toFixed(0)} Ko
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalUrl} alt="Image originale" className="max-h-64 w-full rounded object-contain" />
              </div>
            )}
            {resultUrl && resultSize !== null && (
              <div className="card p-3">
                <p className="mb-2 text-xs font-semibold uppercase text-muted dark:text-muted-dark">
                  Après · {(resultSize / 1024).toFixed(0)} Ko (
                  {Math.round((1 - resultSize / original.size) * 100)}% de gain)
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultUrl} alt="Image compressée" className="max-h-64 w-full rounded object-contain" />
                <a href={resultUrl} download="image-compressee.jpg" className="btn-secondary mt-3 w-full">
                  <Download size={15} /> Télécharger
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
