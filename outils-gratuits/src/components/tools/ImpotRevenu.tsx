"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

// Barème 2026 (revenus 2025), par part de quotient familial.
const TRANCHES = [
  { de: 0, jusqua: 11600, taux: 0 },
  { de: 11600, jusqua: 29579, taux: 0.11 },
  { de: 29579, jusqua: 84577, taux: 0.3 },
  { de: 84577, jusqua: 181917, taux: 0.41 },
  { de: 181917, jusqua: Infinity, taux: 0.45 },
];

const PLAFOND_DEMI_PART = 1807;
const TAUX_DECOTE = 0.4525;
const DECOTE = {
  seul: { seuil: 1982, base: 897 },
  couple: { seuil: 3277, base: 1483 },
};

function impotParPart(quotient: number): number {
  return TRANCHES.reduce((total, t) => {
    if (quotient <= t.de) return total;
    return total + (Math.min(quotient, t.jusqua) - t.de) * t.taux;
  }, 0);
}

function nombreDeParts(couple: boolean, enfants: number): number {
  const base = couple ? 2 : 1;
  const premiers = Math.min(enfants, 2) * 0.5;
  const suivants = Math.max(enfants - 2, 0);
  return base + premiers + suivants;
}

export default function ImpotRevenu() {
  const [revenu, setRevenu] = useState(35000);
  const [couple, setCouple] = useState(false);
  const [enfants, setEnfants] = useState(0);

  const result = useMemo(() => {
    const revenuNet = Math.max(revenu, 0);
    const base = couple ? 2 : 1;
    const parts = nombreDeParts(couple, enfants);

    const impotSansEnfants = impotParPart(revenuNet / base) * base;
    const impotAvecParts = impotParPart(revenuNet / parts) * parts;

    // Plafonnement de l'avantage lié aux demi-parts supplémentaires.
    const avantage = impotSansEnfants - impotAvecParts;
    const plafond = (parts - base) * 2 * PLAFOND_DEMI_PART;
    const plafonne = avantage > plafond;
    const impotBrut = plafonne ? impotSansEnfants - plafond : impotAvecParts;

    // Décote pour les petits impôts.
    const d = couple ? DECOTE.couple : DECOTE.seul;
    const decote = impotBrut < d.seuil ? Math.max(0, d.base - TAUX_DECOTE * impotBrut) : 0;

    const impotNet = Math.max(0, Math.round(impotBrut - decote));
    const quotient = revenuNet / parts;
    const tmi = TRANCHES.find((t) => quotient > t.de && quotient <= t.jusqua)?.taux ?? 0;
    const tauxMoyen = revenuNet > 0 ? impotNet / revenuNet : 0;

    return { parts, impotNet, tmi, tauxMoyen, plafonne, decote: Math.round(decote) };
  }, [revenu, couple, enfants]);

  const pct = (v: number) =>
    (v * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " %";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="revenuImposable">
            Revenu net imposable annuel du foyer (€)
          </label>
          <input
            id="revenuImposable"
            type="number"
            min={0}
            value={revenu}
            onChange={(e) => setRevenu(Number(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div>
          <span className="label">Situation</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCouple(false)}
              className={!couple ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              Seul(e)
            </button>
            <button
              type="button"
              onClick={() => setCouple(true)}
              className={couple ? "btn-primary flex-1" : "btn-secondary flex-1"}
            >
              En couple
            </button>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="enfantsCharge">
            Enfants à charge
          </label>
          <input
            id="enfantsCharge"
            type="number"
            min={0}
            max={10}
            value={enfants}
            onChange={(e) =>
              setEnfants(Math.min(10, Math.max(0, Math.floor(Number(e.target.value) || 0))))
            }
            className="input"
          />
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Impôt estimé</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.impotNet)}</p>
          <p className="mt-1 text-sm text-white/60">
            soit environ {formatCurrency(result.impotNet / 12)} par mois
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Parts</p>
            <p className="text-lg font-semibold text-white">
              {result.parts.toLocaleString("fr-FR")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Taux moyen</p>
            <p className="text-lg font-semibold text-white">{pct(result.tauxMoyen)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Tranche</p>
            <p className="text-lg font-semibold text-white">{pct(result.tmi)}</p>
          </div>
        </div>
        {result.plafonne && (
          <p className="border-t border-white/10 pt-4 text-sm text-white/60">
            Le plafonnement du quotient familial s&apos;applique à votre situation.
          </p>
        )}
        {result.decote > 0 && (
          <p className="border-t border-white/10 pt-4 text-sm text-white/60">
            Une décote de {formatCurrency(result.decote)} a été déduite.
          </p>
        )}
      </div>
    </div>
  );
}
