"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FAQItem } from "@/config/tools";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-md border border-line dark:divide-line-dark dark:border-line-dark">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-ink dark:text-ink-dark"
            >
              {item.question}
              <Plus
                size={16}
                className={cn("shrink-0 text-muted transition-transform dark:text-muted-dark", isOpen && "rotate-45")}
              />
            </button>
            {isOpen && (
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted dark:text-muted-dark">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
