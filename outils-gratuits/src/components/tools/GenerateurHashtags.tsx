"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const PREFIXES = ["", "top", "meilleur", "best", "love", "daily", "instagood", "photo"];
const SUFFIXES = ["france", "2026", "dujour", "officiel", "community", "life", "addict"];

function slugify(word: string) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
}

export default function GenerateurHashtags() {
  const [input, setInput] = useState("voyage, cuisine");
  const [copied, setCopied] = useState(false);

  const hashtags = useMemo(() => {
    const keywords = input
      .split(",")
      .map((k) => slugify(k.trim()))
      .filter(Boolean);
    if (keywords.length === 0) return [];

    const tags = new Set<string>();
    keywords.forEach((k) => {
      tags.add(`#${k}`);
      PREFIXES.forEach((p) => p && tags.add(`#${p}${k}`));
      SUFFIXES.forEach((s) => tags.add(`#${k}${s}`));
    });
    return Array.from(tags).slice(0, 30);
  }, [input]);

  async function copyAll() {
    await navigator.clipboard.writeText(hashtags.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="label" htmlFor="hkeywords">
          Mots-clés (séparés par des virgules)
        </label>
        <input
          id="hkeywords"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          placeholder="voyage, cuisine, paris"
        />
      </div>

      {hashtags.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-brand-700 dark:border-line-dark dark:bg-bg-dark dark:text-brand-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <button type="button" onClick={copyAll} className="btn-primary">
            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copié" : "Copier tous les hashtags"}
          </button>
        </>
      )}
    </div>
  );
}
