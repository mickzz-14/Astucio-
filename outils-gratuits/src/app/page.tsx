import { HeroIllustration } from "@/components/ui/HeroIllustration";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { ToolCard } from "@/components/ui/ToolCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { FAQSection } from "@/components/ui/FAQSection";
import { categories } from "@/config/categories";
import { getPopularTools, getLatestTools, tools } from "@/config/tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Plus de 300 outils gratuits en ligne`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const homeFaq = [
  {
    question: "Les outils sont-ils vraiment gratuits ?",
    answer:
      "Oui, tous les outils d'Astucio sont gratuits et accessibles sans création de compte, sans limite d'utilisation cachée.",
  },
  {
    question: "Mes fichiers et données sont-ils envoyés sur un serveur ?",
    answer:
      "La majorité des outils (PDF, images, mots de passe) fonctionnent entièrement dans votre navigateur : vos fichiers ne sont jamais envoyés ni stockés sur un serveur externe.",
  },
  {
    question: "De nouveaux outils sont-ils ajoutés régulièrement ?",
    answer:
      "Oui, l'objectif d'Astucio est d'atteindre plus de 300 outils. De nouvelles catégories et de nouveaux outils sont publiés chaque semaine.",
  },
];

export default function HomePage() {
  const popular = getPopularTools(6);
  const latest = getLatestTools(6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line dark:border-line-dark">
        <div className="bg-dot-grid absolute inset-0 text-line/60 dark:text-line-dark/50" aria-hidden />
        <div className="container-page relative py-20 text-center sm:py-28">
          <span className="eyebrow justify-center">
            {tools.length}+ outils déjà en ligne · objectif 300+
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            La boîte à outils gratuite pour tout calculer, convertir et créer.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted dark:text-muted-dark">
            Finance, immobilier, santé, mathématiques, PDF, informatique… des outils rapides et
            sans inscription, qui tournent directement dans votre navigateur.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar size="lg" autoFocus={false} />
          </div>
          <div className="mt-10">
            <HeroIllustration />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:border-brand-400 dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-16 space-y-20">
        {/* Categories */}
        <section aria-labelledby="categories-heading">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="eyebrow">Explorer</span>
              <h2 id="categories-heading" className="mt-2 font-display text-2xl font-bold">
                Toutes les catégories
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </section>

        <AdSlot id="home-mid" format="leaderboard" />

        {/* Popular tools */}
        <section aria-labelledby="popular-heading">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="eyebrow">Tendance</span>
              <h2 id="popular-heading" className="mt-2 font-display text-2xl font-bold">
                Outils populaires
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((tool) => (
              <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
            ))}
          </div>
        </section>

        {/* Latest tools */}
        <section aria-labelledby="latest-heading">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="eyebrow">Nouveauté</span>
              <h2 id="latest-heading" className="mt-2 font-display text-2xl font-bold">
                Derniers outils ajoutés
              </h2>
            </div>
            <Link
              href="/finance"
              className="hidden items-center gap-1 text-sm font-semibold text-brand-600 sm:flex dark:text-brand-300"
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((tool) => (
              <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
            ))}
          </div>
        </section>

        <FAQSection items={homeFaq} title="Questions fréquentes sur Astucio" />
      </div>
    </div>
  );
}
