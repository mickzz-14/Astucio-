import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/config/tools";
import { FavoriteButton } from "./FavoriteButton";

export function ToolCard({ tool }: { tool: Tool }) {
  const id = `${tool.category}/${tool.slug}`;
  return (
    <Link
      href={`/${id}`}
      className="card group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-500/60"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="eyebrow">{tool.category.replace("-", " ")}</span>
        <FavoriteButton id={id} />
      </div>
      <h3 className="font-display text-base font-bold leading-snug text-ink dark:text-ink-dark">
        {tool.name}
      </h3>
      <p className="text-sm leading-relaxed text-muted dark:text-muted-dark">
        {tool.shortDescription}
      </p>
      <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
        Ouvrir l&apos;outil
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
