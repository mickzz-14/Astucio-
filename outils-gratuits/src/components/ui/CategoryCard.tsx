import Link from "next/link";
import type { Category } from "@/config/categories";
import { getToolsByCategory } from "@/config/tools";
import { DynamicIcon } from "./DynamicIcon";

export function CategoryCard({ category }: { category: Category }) {
  const count = getToolsByCategory(category.slug).length;
  return (
    <Link
      href={`/${category.slug}`}
      className="card group flex flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-500/60"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded bg-bg text-brand-600 dark:bg-bg-dark dark:text-brand-300">
        <DynamicIcon name={category.icon} size={19} />
      </div>
      <div>
        <h3 className="font-display text-base font-bold text-ink dark:text-ink-dark">
          {category.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted dark:text-muted-dark">
          {category.shortDescription}
        </p>
      </div>
      <span className="mt-auto text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">
        {count} outil{count > 1 ? "s" : ""}
      </span>
    </Link>
  );
}
