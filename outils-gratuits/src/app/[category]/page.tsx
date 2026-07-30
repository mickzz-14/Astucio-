import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/config/categories";
import { getToolsByCategory } from "@/config/tools";
import { ToolCard } from "@/components/ui/ToolCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AdSlot } from "@/components/ui/AdSlot";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { siteConfig } from "@/config/site";

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  const title = `Outils ${category.name} gratuits en ligne`;
  return {
    title,
    description: `${category.description} Tous les outils sont gratuits, sans inscription.`,
    alternates: { canonical: `/${category.slug}` },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description: category.description,
      url: `${siteConfig.url}/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Outils ${category.name}`,
    description: category.description,
    url: `${siteConfig.url}/${category.slug}`,
    hasPart: categoryTools.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      url: `${siteConfig.url}/${category.slug}/${t.slug}`,
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    })),
  };

  return (
    <div className="container-page py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: category.name }]} />

      <div className="mb-10 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-ink text-signal dark:bg-brand-500 dark:text-white">
          <DynamicIcon name={category.icon} size={26} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Outils {category.name}</h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted dark:text-muted-dark">
            {category.description}
          </p>
        </div>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="card p-8 text-center text-sm text-muted dark:text-muted-dark">
          Les premiers outils de cette catégorie arrivent très bientôt.
        </p>
      )}

      <AdSlot id="category-bottom" format="banner" className="mt-12" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
