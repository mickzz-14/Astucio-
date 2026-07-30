import type { FAQItem } from "@/config/tools";
import { FAQAccordion } from "./FAQAccordion";

export function FAQSection({ items, title = "Questions fréquentes" }: { items: FAQItem[]; title?: string }) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="mb-4 font-display text-xl font-bold">
        {title}
      </h2>
      <FAQAccordion items={items} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
