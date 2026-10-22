"use client";

import { useEffect, useMemo, useState } from "react";

const JOUR_MS = 86400000;

function cle(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function parse(s: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return Date.UTC(+m[1], +m[2] - 1, +m[3]);
}

/** Dimanche de Pâques (algorithme grégorien), en UTC. */
function paques(annee: number): number {
  const a = annee % 19;
  const b = Math.floor(annee / 100);
  const c = annee % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31);
  const jour = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(annee, mois - 1, jour);
}

function joursFeries(annee: number): Set<string> {
  const fixes = ["01-01", "05-01", "05-08", "07-14", "08-15", "11-01", "11-11", "12-25"];
  const set = new Set(fixes.map((f) => `${annee}-${f}`));
  const p = paques(annee);
  [1, 39, 50].forEach((decalage) => set.add(cle(new Date(p + decalage * JOUR_MS))));
  return set;
}

export default function JoursOuvres() {
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [deduireFeries, setDeduireFeries] = useState(true);

  useEffect(() => {
    const now = Date.now();
    setDebut(cle(new Date(now)));
    setFin(cle(new Date(now + 29 * JOUR_MS)));
  }, []);

  const result = useMemo(() => {
    const d = parse(debut);
    const f = parse(fin);
    if (d === null || f === null) return null;
    if (f < d) return "inverse" as const;
    if ((f - d) / JOUR_MS > 3660) return "trop-long" as const;

    const feriesParAnnee = new Map<number, Set<string>>();
    let calendaires = 0;
    let weekends = 0;
    let feries = 0;
    let ouvres = 0;

    for (let t = d; t <= f; t += JOUR_MS) {
      const date = new Date(t);
      calendaires += 1;
      const jourSemaine = date.getUTCDay();
      if (jourSemaine === 0 || jourSemaine === 6) {
        weekends += 1;
        continue;
      }
      const annee = date.getUTCFullYear();
      if (!feriesParAnnee.has(annee)) feriesParAnnee.set(annee, joursFeries(annee));
      if (deduireFeries && feriesParAnnee.get(annee)!.has(cle(date))) {
        feries += 1;
        continue;
      }
      ouvres += 1;
    }
    return { calendaires, weekends, feries, ouvres };
  }, [debut, fin, deduireFeries]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="ouvresDebut">
            Date de début (incluse)
          </label>
          <input
            id="ouvresDebut"
            type="date"
            value={debut}
            onChange={(e) => setDebut(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="ouvresFin">
            Date de fin (incluse)
          </label>
          <input
            id="ouvresFin"
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <span className="label">Jours fériés français</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDeduireFeries(true)}
              className={deduireFeries ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              Déduits
            </button>
            <button
              type="button"
              onClick={() => setDeduireFeries(false)}
              className={!deduireFeries ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              Comptés
            </button>
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        {result === null && <p className="text-white/60">Choisissez deux dates.</p>}
        {result === "inverse" && (
          <p className="text-white/60">La date de fin doit être après la date de début.</p>
        )}
        {result === "trop-long" && (
          <p className="text-white/60">La période ne peut pas dépasser 10 ans.</p>
        )}
        {result !== null && typeof result === "object" && (
          <>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">Jours ouvrés</p>
              <p className="text-3xl font-bold text-signal">{result.ouvres}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Jours calendaires</p>
                <p className="text-lg font-semibold text-white">{result.calendaires}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Week-ends</p>
                <p className="text-lg font-semibold text-white">{result.weekends}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Fériés en semaine</p>
                <p className="text-lg font-semibold text-white">{result.feries}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
