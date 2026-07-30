"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";

const formats = [
  { label: "JPG", mime: "image/jpeg", ext: "jpg" },
  { label: "PNG", mime: "image/png", ext: "png" },
  { label: "WEBP", mime: "image/webp", ext: "webp" },
];

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function ConvertirImage() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState(formats[2]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function convert() {
    if (!file) return;
    setBusy(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (target.mime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setResultUrl(URL.createObjectURL(blob));
          setBusy(false);
        },
        target.mime,
        0.92
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
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setResultUrl(null);
          }}
        />
      </label>

      {file && (
        <>
          <div>
            <span className="label">Convertir vers</span>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((f) => (
                <button
                  key={f.ext}
                  type="button"
                  onClick={() => setTarget(f)}
                  className={target.ext === f.ext ? "btn-primary" : "btn-secondary"}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={convert} disabled={busy} className="btn-primary">
            {busy ? "Conversion…" : `Convertir en ${target.label}`}
          </button>

          {resultUrl && (
            <div className="card p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl} alt="Image convertie" className="max-h-64 w-full rounded object-contain" />
              <a href={resultUrl} download={`image-convertie.${target.ext}`} className="btn-secondary mt-3 w-full">
                <Download size={15} /> Télécharger le {target.label}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
