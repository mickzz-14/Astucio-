"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart, SquareTerminal } from "lucide-react";
import { categories } from "@/config/categories";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "@/components/ui/SearchBar";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur dark:border-line-dark dark:bg-surface-dark/90">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-ink text-signal dark:bg-brand-500 dark:text-white">
            <SquareTerminal size={17} />
          </span>
          Astucio
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.slice(0, 7).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="rounded px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-bg hover:text-ink dark:text-muted-dark dark:hover:bg-bg-dark dark:hover:text-ink-dark"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <SearchBar />
        </div>

        <Link
          href="/favoris"
          className="hidden h-9 w-9 items-center justify-center rounded border border-line text-ink transition-colors hover:border-brand-400 hover:text-brand-600 md:flex dark:border-line-dark dark:text-ink-dark"
          aria-label="Mes favoris"
        >
          <Heart size={16} />
        </Link>

        <ThemeToggle />

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded border border-line lg:hidden dark:border-line-dark"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-4 pb-4 pt-3 lg:hidden dark:border-line-dark">
          <div className="mb-3">
            <SearchBar />
          </div>
          <nav className="grid grid-cols-2 gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="rounded px-2.5 py-2 text-sm font-medium text-ink hover:bg-bg dark:text-ink-dark dark:hover:bg-bg-dark"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/favoris"
              onClick={() => setOpen(false)}
              className="col-span-2 mt-1 flex items-center gap-2 rounded border-t border-line px-2.5 py-2.5 text-sm font-medium text-ink dark:border-line-dark dark:text-ink-dark"
            >
              <Heart size={14} /> Mes favoris
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
