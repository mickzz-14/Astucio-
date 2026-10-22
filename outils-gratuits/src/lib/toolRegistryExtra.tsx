import type { ComponentType } from "react";
import { toolRegistryLot2 } from "./toolRegistryLot2";

/** Regroupe les composants des lots d'outils ajoutés après le lancement. */
export const toolRegistryExtra: Record<string, ComponentType> = {
  ...toolRegistryLot2,
};
