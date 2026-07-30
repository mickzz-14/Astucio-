import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string;
  format?: "banner" | "rectangle" | "leaderboard";
  className?: string;
}

const sizes: Record<NonNullable<AdSlotProps["format"]>, string> = {
  banner: "min-h-[100px]",
  rectangle: "min-h-[250px]",
  leaderboard: "min-h-[90px]",
};

/**
 * Reserved layout space for a future Google AdSense unit.
 * Intentionally contains no AdSense script: swap the inner comment for your
 * <ins class="adsbygoogle" ...> tag once the site is approved.
 */
export function AdSlot({ id, format = "banner", className }: AdSlotProps) {
  return (
    <div
      data-ad-slot={id}
      className={cn(
        "flex w-full items-center justify-center rounded border border-dashed border-line text-xs text-muted dark:border-line-dark dark:text-muted-dark",
        sizes[format],
        className
      )}
      aria-hidden="true"
    >
      Emplacement publicitaire réservé ({id})
    </div>
  );
}
