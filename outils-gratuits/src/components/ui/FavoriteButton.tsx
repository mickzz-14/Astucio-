"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();
  const active = hydrated && isFavorite(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-pressed={active}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded border border-line transition-colors hover:border-signal-dark dark:border-line-dark",
        active && "border-signal-dark bg-signal/10 text-signal-dark",
        className
      )}
    >
      <Heart size={14} className={cn(active && "fill-current")} />
    </button>
  );
}
