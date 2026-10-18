"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

function toInt(value: string, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.floor(Number(value) || 0)));
}

export default function BudgetVoyage() {
  const [voyageurs, setVoyageurs] = useState(2);
  const [jours, setJours] = useState(7);
  const [nuits, setNuits] = useState(6);
  const [transport, setTransport] = useState(600);
  const [hebergement, setHebergement] = useState(90);
  const [repas, setRepas] = useState(30);
  const [activites, setActivites] = useState(200);
  const [imprevus, setImprevus] = useState(10);

  const result = useMemo(() => {
    const logement = hebergement * nuits;
    const nourriture = repas * voyageurs * jours;
    const sousTotal = transport + logement + nourriture + activites;
    const marge = sousTotal * (Math.max(imprevus, 0) / 100);
    const total = sousTotal + marge;
    return {
      logement,
      nourriture,
      marge,
      total,
      parPersonne: voyageurs > 0 ? total / voyageurs : 0,
      parJour: jours > 0 ? total / jours : 0,
    };
  }, [voyageurs, jours, nuits, transport, hebergement, repas, activites, imprevus]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label" htmlFor="budgetVoyageurs">
              Voyageurs
            </label>
            <input
              id="budgetVoyageurs"
              type="number"
              min={1}
              value={voyageurs}
              onChange={(e) => setVoyageurs(toInt(e.target.value, 1, 50))}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="budgetJours">
              Jours
            </label>
            <input
              id="budgetJours"
              type="number"
              min={1}
              value={jours}
              onChange={(e) => setJours(toInt(e.target.value, 1, 365))}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="budgetNuits">
              Nuits
            </label>
            <input
              id="budgetNuits"
              type="number"
              min={0}
              value={nuits}
              onChange={(e) => setNuits(toInt(e.target.value, 0, 365))}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="budgetTransport">
            Transport aller-retour, tous voyageurs (€)
          </label>
          <input
            id="budgetTransport"
            type="number"
            min={0}
            value={transport}
            onChange={(e) => setTransport(Number(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div>
          <label className="label" htmlFor="budgetHebergement">
            Hébergement par nuit, tous voyageurs (€)
          </label>
          <input
            id="budgetHebergement"
            type="number"
            min={0}
            value={hebergement}
            onChange={(e) => setHebergement(Number(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div>
          <label className="label" htmlFor="budgetRepas">
            Repas et boissons par jour et par personne (€)
          </label>
          <input
            id="budgetRepas"
            type="number"
            min={0}
            value={repas}
            onChange={(e) => setRepas(Number(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="budgetActivites">
              Activités et visites (€)
            </label>
            <input
              id="budgetActivites"
              type="number"
              min={0}
              value={activites}
              onChange={(e) => setActivites(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="budgetImprevus">
              Marge pour imprévus (%)
            </label>
            <input
              id="budgetImprevus"
              type="number"
              min={0}
              max={100}
              value={imprevus}
              onChange={(e) => setImprevus(Number(e.target.value) || 0)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="readout flex flex-col justify-center gap-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Budget total</p>
          <p className="text-3xl font-bold text-signal">{formatCurrency(result.total)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Par personne</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.parPersonne)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Par jour</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(result.parJour)}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Logement</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.logement)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Repas</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.nourriture)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Imprévus</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(result.marge)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
