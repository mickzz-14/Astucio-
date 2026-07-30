import type { ComponentType } from "react";
import type { Tool } from "@/config/tools";
import type { Category } from "@/config/categories";
import { Breadcrumb } from "./Breadcrumb";
import { FAQSection } from "./FAQSection";
import { RelatedTools } from "./RelatedTools";
import { AdSlot } from "./AdSlot";
import { FavoriteButton } from "./FavoriteButton";

interface ToolPageLayoutProps {
  tool: Tool;
  category: Category;
  related: Tool[];
  ToolComponent: ComponentType;
}

export function ToolPageLayout({ tool, category, related, ToolComponent }: ToolPageLayoutProps) {
  const id = `${tool.category}/${tool.slug}`;

  return (
    <div className="container-page py-10">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: category.name, href: `/${category.slug}` },
          { label: tool.name },
        ]}
      />

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <span className="eyebrow">{category.name}</span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{tool.name}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted dark:text-muted-dark">
            {tool.shortDescription}
          </p>
        </div>
        <FavoriteButton id={id} className="mt-1 h-10 w-10 shrink-0" />
      </div>

      {/* Live tool panel */}
      <div className="card mb-10 p-5 sm:p-8">
        <ToolComponent />
      </div>

      <AdSlot id="tool-top" format="leaderboard" className="mb-12" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-12">
          <section aria-labelledby="explication-heading">
            <h2 id="explication-heading" className="mb-4 font-display text-xl font-bold">
              Comment ça marche
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted dark:text-muted-dark">
              {tool.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {tool.howItWorks && tool.howItWorks.length > 0 && (
              <ol className="mt-6 space-y-3">
                {tool.howItWorks.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink dark:text-ink-dark">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <FAQSection items={tool.faq} />

          <RelatedTools tools={related} />
        </div>

        <aside className="space-y-6">
          <AdSlot id="tool-sidebar" format="rectangle" />
          <div className="card p-5">
            <h3 className="mb-2 font-display text-sm font-bold">À propos de cette catégorie</h3>
            <p className="text-sm leading-relaxed text-muted dark:text-muted-dark">
              {category.description}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
