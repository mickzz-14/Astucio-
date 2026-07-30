"use client";

import { useRef, useState } from "react";
import { Upload, Download, Eraser } from "lucide-react";

export default function SignerPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const ctx = canvasRef.current?.getContext("2d");
    const { x, y } = getPos(e);
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#12151C";
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function end() {
    drawing.current = false;
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setResultUrl(null);
  }

  async function apply() {
    if (!file || !canvasRef.current) return;
    setBusy(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const signatureDataUrl = canvasRef.current.toDataURL("image/png");
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const pngImage = await pdf.embedPng(signatureDataUrl);
      const pages = pdf.getPages();
      const lastPage = pages[pages.length - 1];
      const { width } = lastPage.getSize();
      const sigWidth = 160;
      const sigHeight = (pngImage.height / pngImage.width) * sigWidth;
      lastPage.drawImage(pngImage, {
        x: width - sigWidth - 40,
        y: 40,
        width: sigWidth,
        height: sigHeight,
      });
      const signedBytes = await pdf.save();
      const blob = new Blob([signedBytes], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError("Impossible de signer ce PDF. Vérifiez le fichier et réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line px-6 py-8 text-center transition-colors hover:border-brand-400 dark:border-line-dark">
        <Upload size={20} className="text-muted dark:text-muted-dark" />
        <span className="text-sm font-semibold text-ink dark:text-ink-dark">Choisir un PDF à signer</span>
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
          <div>
            <span className="label">Dessinez votre signature ci-dessous</span>
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              onPointerDown={start}
              onPointerMove={move}
              onPointerUp={end}
              onPointerLeave={end}
              className="w-full touch-none rounded border border-line bg-white dark:border-line-dark"
            />
            <button type="button" onClick={clearSignature} className="btn-secondary mt-2">
              <Eraser size={14} /> Effacer
            </button>
          </div>

          <button type="button" onClick={apply} disabled={busy} className="btn-primary">
            {busy ? "Signature en cours…" : "Appliquer la signature (dernière page)"}
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {resultUrl && (
            <a href={resultUrl} download="document-signe.pdf" className="btn-secondary">
              <Download size={15} /> Télécharger le PDF signé
            </a>
          )}
        </>
      )}
    </div>
  );
}
