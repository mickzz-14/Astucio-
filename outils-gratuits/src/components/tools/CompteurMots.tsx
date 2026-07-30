"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

export default function CompteurMots() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed.length === 0 ? 0 : (trimmed.match(/[.!?]+/g) || []).length || 1;
    const readingMinutes = Math.max(1, Math.round(words / 200));
    return { words, charsWithSpaces, charsNoSpaces, sentences, readingMinutes };
  }, [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Collez ou saisissez votre texte ici…"
        className="input resize-y font-body"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {[
          { label: "Mots", value: stats.words },
          { label: "Caractères", value: stats.charsWithSpaces },
          { label: "Sans espaces", value: stats.charsNoSpaces },
          { label: "Phrases", value: stats.sentences },
          { label: "Lecture (min)", value: stats.readingMinutes },
        ].map((s) => (
          <div key={s.label} className="readout p-4 text-center">
            <p className="text-2xl font-bold text-signal">{formatNumber(s.value, 0)}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-white/50">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
