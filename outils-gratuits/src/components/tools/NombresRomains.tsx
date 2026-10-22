"use client";

import { useMemo, useState } from "react";

const TABLE: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const VALEURS: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

function versRomain(n: number): string {
  let reste = n;
  let sortie = "";
  for (const [valeur, symbole] of TABLE) {
    while (reste >= valeur) {
      sortie += symbole;
      reste -= valeur;
    }
  }
  return sortie;
}

function versArabe(texte: string): number | null {
  const maj = texte.trim().toUpperCase();
  if (!/^[MDCLXVI]+$/.test(maj)) return null;
  let total = 0;
  for (let i = 0; i < maj.length; i++) {
    const courant = VALEURS[maj[i]];
    const suivant = i + 1 < maj.length ? VALEURS[maj[i + 1]] : 0;
    total += courant < suivant ? -courant : courant;
  }
  return total >= 1 && total <= 3999 && versRomain(total) === maj ? total : null;
}

export default function NombresRomains() {
  const [nombre, setNombre] = useState("2026");
  const [romain, setRomain] = useState("MMXXVI");

  const enRomain = useMemo(() => {
    const n = Number(nombre);
    if (!nombre.trim() || !Number.isInteger(n)) return null;
    if (n < 1 || n > 3999) return "hors-limites" as const;
    return versRomain(n);
  }, [nombre]);

  const enArabe = useMemo(() => {
    if (!romain.trim()) return null;
    return versArabe(romain) ?? ("invalide" as const);
  }, [romain]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="readout space-y-3 p-6">
          <label className="text-xs uppercase tracking-widest text-white/50" htmlFor="romainNombre">
            Nombre (1 à 3999)
          </label>
          <input
            id="romainNombre"
            type="number"
            min={1}
            max={3999}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input"
          />
          <p className="text-3xl font-bold text-signal">
            {enRomain === null && "—"}
            {enRomain === "hors-limites" && "Entre 1 et 3999"}
            {enRomain !== null && enRomain !== "hors-limites" && enRomain}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="readout space-y-3 p-6">
          <label className="text-xs uppercase tracking-widest text-white/50" htmlFor="romainTexte">
            Chiffres romains
          </label>
          <input
            id="romainTexte"
            type="text"
            value={romain}
            onChange={(e) => setRomain(e.target.value)}
            className="input"
          />
          <p className="text-3xl font-bold text-signal">
            {enArabe === null && "—"}
            {enArabe === "invalide" && "Écriture invalide"}
            {typeof enArabe === "number" && enArabe.toLocaleString("fr-FR")}
          </p>
        </div>
      </div>
    </div>
  );
}
