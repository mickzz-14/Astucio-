"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function GenerateurQRCode() {
  const [text, setText] = useState("https://www.astucio.fr");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [color, setColor] = useState("#12151C");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!text.trim()) {
        setDataUrl(null);
        return;
      }
      const QRCode = (await import("qrcode")).default;
      try {
        const url = await QRCode.toDataURL(text, {
          width: 480,
          margin: 2,
          color: { dark: color, light: "#ffffff" },
        });
        if (!cancelled) setDataUrl(url);
      } catch {
        if (!cancelled) setDataUrl(null);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [text, color]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="qrtext">
            Texte, URL ou information à encoder
          </label>
          <textarea
            id="qrtext"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="input resize-none"
            placeholder="https://exemple.fr"
          />
        </div>
        <div>
          <label className="label" htmlFor="qrcolor">
            Couleur du QR code
          </label>
          <input
            id="qrcolor"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-20 rounded border border-line bg-transparent dark:border-line-dark"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-line bg-white p-6 dark:border-line-dark">
        {dataUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="QR code généré" className="h-56 w-56" />
            <a href={dataUrl} download="qr-code.png" className="btn-secondary">
              <Download size={15} /> Télécharger le PNG
            </a>
          </>
        ) : (
          <p className="text-sm text-muted">Saisissez du texte pour générer un QR code.</p>
        )}
      </div>
    </div>
  );
}
