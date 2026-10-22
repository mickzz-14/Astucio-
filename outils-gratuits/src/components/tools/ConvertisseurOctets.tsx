"use client";

import { useMemo, useState } from "react";

const UNITES = [
  { id: "o", label: "octet (o)", facteur: 1 },
  { id: "ko", label: "kilooctet (Ko)", facteur: 1e3 },
  { id: "mo", label: "mégaoctet (Mo)", facteur: 1e6 },
  { id: "go", label: "gigaoctet (Go)", facteur: 1e9 },
  { id: "to", label: "téraoctet (To)", facteur: 1e12 },
  { id: "kio", label: "kibioctet (Kio)", facteur: 1024 },
  { id: "mio", label: "mébioctet (Mio)", facteur: 1024 ** 2 },
  { id: "gio", label: "gibioctet (Gio)", facteur: 1024 ** 3 },
  { id: "tio", label: "tébioctet (Tio)", facteur: 1024 ** 4 },
];

export default function ConvertisseurOctets() {
  const [valeur, setValeur] = useState(1);
  const [unite, setUnite] = useState("go");

  const lignes = useMemo(() => {
    const source = UNITES.find((u) => u.id === unite) ?? UNITES[0];
    const octets = valeur * source.facteur;
    return UNITES.map((u) => ({
      ...u,
      resultat: (octets / u.facteur).toLocaleString("fr-FR", { maximumSignificantDigits: 8 }),
    }));
  }, [valeur, unite]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="octetsValeur">
            Valeur
          </label>
          <input
            id="octetsValeur"
            type="number"
            min={0}
            value={valeur}
            onChange={(e) => setValeur(Number(e.target.value) || 0)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="octetsUnite">
            Unité
          </label>
          <select
            id="octetsUnite"
            value={unite}
            onChange={(e) => setUnite(e.target.value)}
            className="input"
          >
            {UNITES.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-3 p-6">
        {lignes.map((l) => (
          <div
            key={l.id}
            className={
              l.id === unite
                ? "flex items-baseline justify-between border-t border-white/10 pt-3 text-signal"
                : "flex items-baseline justify-between border-t border-white/10 pt-3 text-white"
            }
          >
            <span className="text-sm text-white/60">{l.label}</span>
            <span className="font-semibold">{l.resultat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
