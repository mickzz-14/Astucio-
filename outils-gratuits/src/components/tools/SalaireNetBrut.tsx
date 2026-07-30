"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function SalaireNetBrut() {
  const [net, setNet] = useState(2000);
  const [statut, setStatut] = useState<"non-cadre" | "cadre">("non-cadre");
  const [taux, setTaux] = useState(22);

  function handleStatut(s: "non-cadre" | "cadre") {
    setStatut(s);
    setTaux(s === "cadre" ? 25 : 22);
  }

  const brut = useMemo(() => (taux < 100 ? net / (1 - taux / 100) : 0), [net, taux]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label className="label">Salaire net mensuel souhaité</label>
          <input type="number" value={net} onChange={(e) => setNet(Number(e.target.value) || 0)} className="input" />
        </div>
        <div>
          <span className="label">Statut</span>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => handleStatut("non-cadre")} className={statut === "non-cadre" ? "btn-primary" : "btn-secondary"}>
              Non-cadre
            </button>
            <button type="button" onClick={() => handleStatut("cadre")} className={statut === "cadre" ? "btn-primary" : "btn-secondary"}>
              Cadre
            </button>
          </div>
        </div>
        <div>
          <label className="label">Taux de charges salariales estimé (%)</label>
          <input type="number" step={0.5} value={taux} onChange={(e) => setTaux(Number(e.target.value) || 0)} className="input" />
        </div>
      </div>
      <div className="readout flex flex-col justify-center gap-2 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">Salaire brut équivalent</p>
        <p className="text-3xl font-bold text-signal">{formatCurrency(brut)}</p>
        <p className="text-xs text-white/40">Estimation indicative, hors cas particuliers.</p>
      </div>
    </div>
  );
}
