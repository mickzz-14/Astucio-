"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

type Category = "longueur" | "poids" | "volume" | "temperature";

const units: Record<Category, Record<string, number>> = {
  longueur: {
    mètre: 1,
    kilomètre: 1000,
    centimètre: 0.01,
    millimètre: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    pied: 0.3048,
    pouce: 0.0254,
  },
  poids: {
    kilogramme: 1,
    gramme: 0.001,
    tonne: 1000,
    livre: 0.453592,
    once: 0.0283495,
  },
  volume: {
    litre: 1,
    millilitre: 0.001,
    "mètre cube": 1000,
    "gallon (US)": 3.78541,
    "pinte (US)": 0.473176,
  },
  temperature: { celsius: 1, fahrenheit: 1, kelvin: 1 },
};

function convertTemperature(value: number, from: string, to: string) {
  let celsius: number;
  if (from === "celsius") celsius = value;
  else if (from === "fahrenheit") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15;

  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

const categoryLabels: Record<Category, string> = {
  longueur: "Longueur",
  poids: "Poids",
  volume: "Volume",
  temperature: "Température",
};

export default function ConvertisseurUnites() {
  const [category, setCategory] = useState<Category>("longueur");
  const unitNames = Object.keys(units[category]);
  const [from, setFrom] = useState(unitNames[0]);
  const [to, setTo] = useState(unitNames[1]);
  const [value, setValue] = useState(1);

  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    const names = Object.keys(units[cat]);
    setFrom(names[0]);
    setTo(names[1]);
  }

  const result = useMemo(() => {
    if (category === "temperature") return convertTemperature(value, from, to);
    const table = units[category];
    return (value * table[from]) / table[to];
  }, [category, from, to, value]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(categoryLabels) as Category[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => handleCategoryChange(c)}
            className={category === c ? "btn-primary" : "btn-secondary"}
          >
            {categoryLabels[c]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="label">De</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value) || 0)}
            className="input mb-2"
          />
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="input">
            {Object.keys(units[category]).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center pb-2 text-muted dark:text-muted-dark sm:pt-8">
          →
        </div>

        <div>
          <label className="label">Vers</label>
          <div className="input mb-2 flex items-center font-mono font-semibold text-brand-600 dark:text-brand-300">
            {formatNumber(result, 4)}
          </div>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="input">
            {Object.keys(units[category]).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
