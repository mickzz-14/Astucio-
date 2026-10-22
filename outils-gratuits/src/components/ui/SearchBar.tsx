"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { searchTools } from "@/config/tools";
import { getCategory } from "@/config/categories";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  size?: "md" | "lg";
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ size = "md", placeholder, autoFocus }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLFormElement>(null);

  const results = useMemo(() => searchTools(query).slice(0, 7), [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results[0]) {
      router.push(`/${results[0].category}/${results[0].slug}`);
      setOpen(false);
    }
  }

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      role="search"
      className="relative w-full"
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setTimeout(() => setOpen(false), 100);
        }
      }}
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border border-line bg-surface px-4 shadow-panel dark:border-line-dark dark:bg-surface-dark",
          size === "lg" ? "h-14" : "h-11"
        )}
      >
        <Search size={size === "lg" ? 20 : 16} className="shrink-0 text-muted dark:text-muted-dark" />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder ?? "Rechercher parmi nos outils (ex : TVA, PDF, IMC…)"}
          className={cn(
            "w-full bg-transparent text-ink outline-none placeholder:text-muted dark:text-ink-dark dark:placeholder:text-muted-dark",
            size === "lg" ? "text-base" : "text-sm"
          )}
        />
      </div>

      {open && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-auto rounded-md border border-line bg-surface shadow-panel dark:border-line-dark dark:bg-surface-dark">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-muted dark:text-muted-dark">
              Aucun outil ne correspond à « {query} ».
            </p>
          ) : (
            <ul>
              {results.map((tool) => {
                const cat = getCategory(tool.category);
                return (
                  <li key={`${tool.category}-${tool.slug}`}>
                    <a
                      href={`/${tool.category}/${tool.slug}`}
                      className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-sm last:border-b-0 hover:bg-bg dark:border-line-dark dark:hover:bg-bg-dark"
                    >
                      <span>
                        <span className="block font-medium text-ink dark:text-ink-dark">
                          {tool.name}
                        </span>
                        <span className="text-xs text-muted dark:text-muted-dark">
                          {cat?.name} · {tool.shortDescription}
                        </span>
                      </span>
                      <ArrowRight size={14} className="shrink-0 text-muted dark:text-muted-dark" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
