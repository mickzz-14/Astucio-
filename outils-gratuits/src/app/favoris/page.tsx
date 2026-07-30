"use client";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ToolCard } from "@/components/ui/ToolCard";
import { useFavorites } from "@/context/FavoritesContext";
import { tools } from "@/config/tools";
import { Heart } from "lucide-react";

export default function FavorisPage() {
  const { favorites, hydrated } = useFavorites();

  const favoriteTools = tools.filter((t) => favorites.includes(`${t.category}/${t.slug}`));

  return (
    <div className="container-page py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mes favoris" }]} />
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Mes outils favoris</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted dark:text-muted-dark">
        Vos favoris sont enregistrés uniquement sur cet appareil, dans votre navigateur.
      </p>

      {!hydrated ? null : favoriteTools.length === 0 ? (
        <div className="card mt-8 flex flex-col items-center gap-3 p-10 text-center">
          <Heart size={24} className="text-muted dark:text-muted-dark" />
          <p className="text-sm text-muted dark:text-muted-dark">
            Vous n&apos;avez pas encore ajouté d&apos;outil à vos favoris. Cliquez sur le cœur d&apos;un
            outil pour le retrouver ici.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteTools.map((tool) => (
            <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
