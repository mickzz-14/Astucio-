import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { toolRegistryExtra } from "./toolRegistryExtra";
/**
 * Every interactive tool is registered here by the `component` key used in
 * src/config/tools.ts. Components are dynamically imported (code-split) so a
 * visitor only downloads the JavaScript for the tool they actually open.
 *
 * To add a new tool:
 *  1. Create src/components/tools/MonOutil.tsx (default export, no required props)
 *  2. Add an entry below: MonOutil: dynamic(() => import("...")).
 *  3. Add the tool's metadata to src/config/tools.ts.
 */
export const toolComponentRegistry: Record<string, ComponentType> = {
  CalculateurCredit: dynamic(() => import("@/components/tools/CalculateurCredit")),
  CalculateurInteretsComposes: dynamic(
    () => import("@/components/tools/CalculateurInteretsComposes")
  ),
  CalculateurTVA: dynamic(() => import("@/components/tools/CalculateurTVA")),
  CalculateurIMC: dynamic(() => import("@/components/tools/CalculateurIMC")),
  CalculateurPourcentage: dynamic(() => import("@/components/tools/CalculateurPourcentage")),
  CalculateurAge: dynamic(() => import("@/components/tools/CalculateurAge")),
  ConvertisseurUnites: dynamic(() => import("@/components/tools/ConvertisseurUnites")),
  FusionnerPDF: dynamic(() => import("@/components/tools/FusionnerPDF")),
  CompresserImage: dynamic(() => import("@/components/tools/CompresserImage")),
  ConvertirImage: dynamic(() => import("@/components/tools/ConvertirImage")),
  GenerateurMotDePasse: dynamic(() => import("@/components/tools/GenerateurMotDePasse")),
  GenerateurQRCode: dynamic(() => import("@/components/tools/GenerateurQRCode")),
  CompteurMots: dynamic(() => import("@/components/tools/CompteurMots")),
  GenerateurLoremIpsum: dynamic(() => import("@/components/tools/GenerateurLoremIpsum")),
  GenerateurHashtags: dynamic(() => import("@/components/tools/GenerateurHashtags")),
  SalaireBrutNet: dynamic(() => import("@/components/tools/SalaireBrutNet")),
  SalaireNetBrut: dynamic(() => import("@/components/tools/SalaireNetBrut")),
  CongesPayes: dynamic(() => import("@/components/tools/CongesPayes")),
  HeuresSupplementaires: dynamic(() => import("@/components/tools/HeuresSupplementaires")),
  FraisKilometriques: dynamic(() => import("@/components/tools/FraisKilometriques")),
  SalaireHoraire: dynamic(() => import("@/components/tools/SalaireHoraire")),
  FraisNotaire: dynamic(() => import("@/components/tools/FraisNotaire")),
  RentabiliteLocative: dynamic(() => import("@/components/tools/RentabiliteLocative")),
  PlusValueImmobiliere: dynamic(() => import("@/components/tools/PlusValueImmobiliere")),
  CaloriesQuotidiennes: dynamic(() => import("@/components/tools/CaloriesQuotidiennes")),
  PoidsIdeal: dynamic(() => import("@/components/tools/PoidsIdeal")),
  MoyennePonderee: dynamic(() => import("@/components/tools/MoyennePonderee")),
  RegleDeTrois: dynamic(() => import("@/components/tools/RegleDeTrois")),
  SimplificateurFraction: dynamic(() => import("@/components/tools/SimplificateurFraction")),
  ConvertisseurDevises: dynamic(() => import("@/components/tools/ConvertisseurDevises")),
  ConvertisseurSurface: dynamic(() => import("@/components/tools/ConvertisseurSurface")),
  CompresserPDF: dynamic(() => import("@/components/tools/CompresserPDF")),
  SignerPDF: dynamic(() => import("@/components/tools/SignerPDF")),
  EncodeurBase64: dynamic(() => import("@/components/tools/EncodeurBase64")),
  GenerateurHashMD5: dynamic(() => import("@/components/tools/GenerateurHashMD5")),
  GenerateurUUID: dynamic(() => import("@/components/tools/GenerateurUUID")),
  ConsommationElectrique: dynamic(() => import("@/components/tools/ConsommationElectrique")),
  ConsommationCarburant: dynamic(() => import("@/components/tools/ConsommationCarburant")),
  JoursEntreDeuxDates: dynamic(() => import("@/components/tools/JoursEntreDeuxDates")),
 ImpotRevenu: dynamic(() => import("@/components/tools/ImpotRevenu")),
  PrelevementSource: dynamic(() => import("@/components/tools/PrelevementSource")),
  CreditImpotEmploiDomicile: dynamic(
    () => import("@/components/tools/CreditImpotEmploiDomicile")
  ),
  FuseauxHoraires: dynamic(() => import("@/components/tools/FuseauxHoraires")),
  BudgetVoyage: dynamic(() => import("@/components/tools/BudgetVoyage")),
  DistanceVilles: dynamic(() => import("@/components/tools/DistanceVilles")),
  ...toolRegistryExtra,};    
