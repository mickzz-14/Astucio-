"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  id: string;
  format?: "banner" | "rectangle" | "leaderboard";
  className?: string;
}

/**
 * Numéros des blocs publicitaires créés dans AdSense (data-ad-slot).
 * Tant qu'une valeur est vide, rien ne s'affiche à cet emplacement.
 */
const SLOT_IDS: Record<string, string> = {
  "home-mid": "",
  "tool-top": "",
  "tool-sidebar": "",
};

export function AdSlot({ id, className }: AdSlotProps) {
  const slot = SLOT_IDS[id];
  const dejaCharge = useRef(false);

  useEffect(() => {
    if (!slot || dejaCharge.current) return;
    dejaCharge.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Le script AdSense n'est pas encore chargé : on ignore.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={cn("w-full overflow-hidden", className)} data-ad-slot-id={id}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsenseClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
