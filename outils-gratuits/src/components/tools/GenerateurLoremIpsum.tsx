"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat".split(
    " "
  );

function makeSentence(minWords = 6, maxWords = 14) {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords));
  const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function makeParagraph(sentences = 5) {
  return Array.from({ length: sentences }, () => makeSentence()).join(" ");
}

type Unit = "paragraphes" | "phrases" | "mots";

export default function GenerateurLoremIpsum() {
  const [unit, setUnit] = useState<Unit>("paragraphes");
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (unit === "mots") {
      return Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");
    }
    if (unit === "phrases") {
      return Array.from({ length: count }, () => makeSentence()).join(" ");
    }
    return Array.from({ length: count }, () => makeParagraph()).join("\n\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, count, seed]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="label">Unité</label>
          <div className="flex gap-2">
            {(["paragraphes", "phrases", "mots"] as Unit[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={unit === u ? "btn-primary" : "btn-secondary"}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="label">Quantité</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="input w-24"
          />
        </div>
        <button type="button" onClick={() => setSeed((s) => s + 1)} className="btn-secondary">
          Régénérer
        </button>
        <button type="button" onClick={copy} className="btn-primary ml-auto">
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copié" : "Copier"}
        </button>
      </div>

      <div className="card whitespace-pre-line p-5 text-sm leading-relaxed text-ink dark:text-ink-dark">
        {output}
      </div>
    </div>
  );
}
