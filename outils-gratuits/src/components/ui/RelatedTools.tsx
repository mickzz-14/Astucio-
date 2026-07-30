import type { Tool } from "@/config/tools";
import { ToolCard } from "./ToolCard";

export function RelatedTools({ tools, title = "Outils similaires" }: { tools: Tool[]; title?: string }) {
  if (tools.length === 0) return null;
  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={`${tool.category}-${tool.slug}`} tool={tool} />
        ))}
      </div>
    </section>
  );
}
