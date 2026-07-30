"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface Ligne {
  id: string;
  note: number;
  coefficient: number;
}

export default function MoyennePonderee() {
  const [lignes, setLignes] = useState<Ligne[]>([
    { id: crypto.randomUUID(), note: 14, coefficient: 2 },
    { id: crypto.randomUUID(), note: 12, coefficient: 1 },
  ]);

  function update(id: string, field: "note" | "coefficient", value: number) {
    setLignes((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }

  function add() {
    setLignes((prev) => [...prev, { id: crypto.randomUUID(), note: 10, coefficient: 1 }]);
  }

  function remove(id: string) {
    setLignes((prev) => prev.filter((l) => l.id !== id));
  }

  const moyenne = useMemo(() => {
    const totalCoef = lignes.reduce((s, l) => s + l.coefficient, 0);
    if (totalCoef === 0) return 0;
    const totalPoints = lignes.reduce((s, l) => s + l.note * l.coefficient, 0);
    return totalPoints / totalCoef;
  }, [lignes]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {lignes.map((l) => (
          <div key={l.id} className="flex items-center gap-3">
            <input
              type="number"
              value={l.note}
              onChange={(e) => update(l.id, "note", Number(e.target.value) || 0)}
              className="input"
              placeholder="Note"
            />
            <span className="text-xs text-muted dark:text-muted-dark">×</span>
            <input
              type="number"
              value={l.coefficient}
              onChange={(e) => update(l.id, "coefficient", Number(e.target.value) || 0)}
              className="input w-24"
              placeholder="Coef"
            />
            <button type="button" onClick={() => remove(l.id)} aria-label="Retirer">
              <X size={16} className="text-muted hover:text-red-500 dark:text-muted-dark" />
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={add} className="btn-secondary">
        <Plus size={15} /> Ajouter une note
      </button>

      <div className="readout flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-white/50">Moyenne pondérée</p>
        <p className="text-3xl font-bold text-signal">{formatNumber(moyenne, 2)} / 20</p>
      </div>
    </div>
  );
}
