"use client";

import { useMemo, useState } from "react";

type RGB = [number, number, number];

function parseHex(valeur: string): RGB | null {
  const brut = valeur.trim().replace(/^#/, "");
  const complet =
    brut.length === 3
      ? brut
          .split("")
          .map((c) => c + c)
          .join("")
      : brut;
  if (!/^[0-9a-fA-F]{6}$/.test(complet)) return null;
  return [
    parseInt(complet.slice(0, 2), 16),
    parseInt(complet.slice(2, 4), 16),
    parseInt(complet.slice(4, 6), 16),
  ];
}

function versHex([r, g, b]: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function versHsl([r, g, b]: RGB): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const delta = max - min;
  if (delta === 0) return [0, 0, Math.round(l * 100)];
  const s = delta / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / delta) % 6;
  else if (max === gn) h = (bn - rn) / delta + 2;
  else h = (rn - gn) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  return [h, Math.round(s * 100), Math.round(l * 100)];
}

export default function ConvertisseurCouleurs() {
  const [rgb, setRgb] = useState<RGB>([37, 99, 235]);
  const [texte, setTexte] = useState("#2563EB");

  const hsl = useMemo(() => versHsl(rgb), [rgb]);

  const changerHex = (valeur: string) => {
    setTexte(valeur);
    const p = parseHex(valeur);
    if (p) setRgb(p);
  };

  const changerCanal = (index: number, valeur: string) => {
    const v = Math.min(255, Math.max(0, Math.floor(Number(valeur) || 0)));
    const next: RGB = [...rgb] as RGB;
    next[index] = v;
    setRgb(next);
    setTexte(versHex(next));
  };

  const canaux = ["Rouge", "Vert", "Bleu"];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="couleurHex">
            Code HEX
          </label>
          <div className="flex gap-3">
            <input
              id="couleurHex"
              type="text"
              value={texte}
              onChange={(e) => changerHex(e.target.value)}
              className="input"
              maxLength={7}
            />
            <input
              type="color"
              aria-label="Choisir une couleur"
              value={versHex(rgb).toLowerCase()}
              onChange={(e) => changerHex(e.target.value)}
              className="h-11 w-16 cursor-pointer rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {canaux.map((nom, i) => (
            <div key={nom}>
              <label className="label" htmlFor={`couleurCanal${i}`}>
                {nom}
              </label>
              <input
                id={`couleurCanal${i}`}
                type="number"
                min={0}
                max={255}
                value={rgb[i]}
                onChange={(e) => changerCanal(i, e.target.value)}
                className="input"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div
          className="h-24 w-full rounded-lg border border-white/20"
          style={{ backgroundColor: versHex(rgb) }}
          aria-hidden="true"
        />
        <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-white/50">HEX</span>
            <span className="font-semibold text-signal">{versHex(rgb)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-white/50">RGB</span>
            <span className="font-semibold text-white">
              rgb({rgb[0]}, {rgb[1]}, {rgb[2]})
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-white/50">HSL</span>
            <span className="font-semibold text-white">
              hsl({hsl[0]}, {hsl[1]}%, {hsl[2]}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
