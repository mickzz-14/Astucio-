import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/config/categories";
import { tools, getTool, getRelatedTools } from "@/config/tools";
import { toolComponentRegistry } from "@/lib/toolRegistry";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { siteConfig } from "@/config/site";

interface Props {
  params: { category: string; tool: string };
}

export function generateStaticParams() {
  return tools.map((t) => ({ category: t.category, tool: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = getTool(params.category, params.tool);
  if (!tool) return {};
  const category = getCategory(tool.category);
  const title = tool.metaTitle ?? `${tool.name} — Gratuit et en ligne`;
  const url = `${siteConfig.url}/${tool.category}/${tool.slug}`;

  return {
    title,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: { canonical: `/${tool.category}/${tool.slug}` },
    openGraph: {
      type: "website",
      title: `${title} · ${siteConfig.name}`,
      description: tool.metaDescription,
      url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tool.metaDescription,
    },
    other: category ? { "article:section": category.name } : undefined,
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getTool(params.category, params.tool);
  if (!tool) notFound();
  const category = getCategory(tool.category);
  if (!category) notFound();

  const ToolComponent = toolComponentRegistry[tool.component];
  if (!ToolComponent) notFound();

  const related = getRelatedTools(tool);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.metaDescription,
    url: `${siteConfig.url}/${tool.category}/${tool.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (navigateur web)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <>
      <ToolPageLayout tool={tool} category={category} related={related} ToolComponent={ToolComponent} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
