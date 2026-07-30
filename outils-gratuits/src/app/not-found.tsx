import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { getPopularTools } from "@/config/tools";
import { ToolCard } from "@/components/ui/ToolCard";

export default function NotFound() {
  const popular = getPopularTools(3);

  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <span className="font-mono text-sm text-signal-dark">Erreur 404</span>
      <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
        Cette page n&apos;existe pas (encore).
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted dark:text-muted-dark">
        L&apos;outil que vous cherchez a peut-être changé d&apos;adresse, ou n&apos;est pas encore
        disponible. Essayez une recherche ou repartez de l&apos;accueil.
      </p>

      <div className="mt-8 w-full max-w-md">
        <SearchBar placeholder="Rechercher un outil…" />
      </div>

      <Link href="/" className="btn-primary mt-6">
        Retour à l&apos;accueil
      </Link>

      <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
        {popular.map((tool) => (
          <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}
