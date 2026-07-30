export type CategorySlug =
  | "finance"
  | "impots"
  | "immobilier"
  | "travail"
  | "sante"
  | "education"
  | "mathematiques"
  | "conversions"
  | "voyages"
  | "automobile"
  | "energie"
  | "informatique"
  | "pdf"
  | "images-medias"
  | "vie-quotidienne";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortDescription: string;
  description: string;
  icon: string; // lucide-react icon name
}

export const categories: Category[] = [
  {
    slug: "finance",
    name: "Finance",
    shortDescription: "Crédit, épargne, TVA, salaire",
    description:
      "Des calculateurs financiers pour préparer un emprunt, estimer des intérêts, convertir un salaire brut en net ou calculer la TVA, sans tableur ni formule à retenir.",
    icon: "Wallet",
  },
  {
    slug: "impots",
    name: "Impôts",
    shortDescription: "Barème, tranches, simulation",
    description:
      "Des outils pour estimer son impôt sur le revenu, comprendre les tranches d'imposition et anticiper sa déclaration.",
    icon: "Landmark",
  },
  {
    slug: "immobilier",
    name: "Immobilier",
    shortDescription: "Frais de notaire, rentabilité, plus-value",
    description:
      "Des calculateurs pour préparer un achat, une location ou un investissement immobilier : frais de notaire, rentabilité locative, plus-value et surface.",
    icon: "Home",
  },
  {
    slug: "travail",
    name: "Travail",
    shortDescription: "Salaire, congés, temps de travail",
    description:
      "Des outils pour le quotidien professionnel : calcul de salaire, de congés, d'indemnités et de temps de travail.",
    icon: "Briefcase",
  },
  {
    slug: "sante",
    name: "Santé",
    shortDescription: "IMC, calories, bien-être",
    description:
      "Des calculateurs simples pour suivre des indicateurs de santé courants, à titre indicatif.",
    icon: "HeartPulse",
  },
  {
    slug: "education",
    name: "Éducation",
    shortDescription: "Moyennes, conversions, révisions",
    description:
      "Des outils pour élèves, étudiants et enseignants : calcul de moyenne, comptage de mots, conversions de notes et plus.",
    icon: "GraduationCap",
  },
  {
    slug: "mathematiques",
    name: "Mathématiques",
    shortDescription: "Pourcentage, âge, règle de trois, fractions",
    description:
      "Les calculs du quotidien traités instantanément : pourcentages, âge, règle de trois, fractions et bien d'autres.",
    icon: "Calculator",
  },
  {
    slug: "conversions",
    name: "Conversions",
    shortDescription: "Unités, devises, températures",
    description:
      "Convertissez unités, devises, longueurs, poids et températures en un clic, avec des résultats précis et instantanés.",
    icon: "ArrowLeftRight",
  },
  {
    slug: "voyages",
    name: "Voyages",
    shortDescription: "Fuseaux horaires, distances, budget",
    description:
      "Des outils pratiques pour préparer un voyage : distances, fuseaux horaires, budget et conversions utiles en déplacement.",
    icon: "Plane",
  },
  {
    slug: "automobile",
    name: "Automobile",
    shortDescription: "Carburant, coût, entretien",
    description:
      "Des calculateurs dédiés à l'automobile : consommation de carburant, coût d'usage, entretien et plus.",
    icon: "Car",
  },
  {
    slug: "energie",
    name: "Énergie",
    shortDescription: "Consommation électrique, coûts",
    description:
      "Des outils pour estimer sa consommation électrique, ses coûts d'énergie et son empreinte carbone au quotidien.",
    icon: "Zap",
  },
  {
    slug: "informatique",
    name: "Informatique",
    shortDescription: "Mots de passe, QR codes, générateurs",
    description:
      "Des utilitaires web et développeur essentiels : générateurs de mots de passe, QR codes, hashtags, texte de remplissage et plus.",
    icon: "Code2",
  },
  {
    slug: "pdf",
    name: "PDF & Documents",
    shortDescription: "Fusion, compression, conversion",
    description:
      "Manipulez vos documents PDF : fusion, compression, conversion et extraction, en toute confidentialité.",
    icon: "FileText",
  },
  {
    slug: "images-medias",
    name: "Images & Médias",
    shortDescription: "Compression, conversion, édition",
    description:
      "Compressez, convertissez et retouchez vos images directement dans le navigateur, sans upload sur un serveur externe.",
    icon: "Image",
  },
  {
    slug: "vie-quotidienne",
    name: "Vie quotidienne",
    shortDescription: "Dates, calendrier, petits outils du jour",
    description:
      "Des petits outils pratiques pour simplifier les tâches du quotidien : jours entre deux dates, calendrier et bien d'autres.",
    icon: "Sun",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
