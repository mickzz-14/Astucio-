import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const toolRegistryLot2: Record<string, ComponentType> = {
  CapaciteEmprunt: dynamic(() => import("@/components/tools/CapaciteEmprunt")),
  MargeCommerciale: dynamic(() => import("@/components/tools/MargeCommerciale")),
  RemiseSolde: dynamic(() => import("@/components/tools/RemiseSolde")),
  ObjectifEpargne: dynamic(() => import("@/components/tools/ObjectifEpargne")),
  PourboireAddition: dynamic(() => import("@/components/tools/PourboireAddition")),
  JoursOuvres: dynamic(() => import("@/components/tools/JoursOuvres")),
  SommeilCycles: dynamic(() => import("@/components/tools/SommeilCycles")),
  FrequenceCardiaque: dynamic(() => import("@/components/tools/FrequenceCardiaque")),
  ConvertisseurOctets: dynamic(() => import("@/components/tools/ConvertisseurOctets")),
  ConvertisseurCouleurs: dynamic(() => import("@/components/tools/ConvertisseurCouleurs")),
  NombresRomains: dynamic(() => import("@/components/tools/NombresRomains")),
  EquationSecondDegre: dynamic(() => import("@/components/tools/EquationSecondDegre")),
};
