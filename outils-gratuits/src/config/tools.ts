import type { CategorySlug } from "./categories";
import { toolsExtra } from "./toolsExtra";
import { faqExtra } from "./faqExtra";
export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tool {
  /** URL slug, unique within its category */
  slug: string;
  category: CategorySlug;
  /** Display name */
  name: string;
  /** Short one-line pitch used on cards and listings */
  shortDescription: string;
  /** SEO meta title (if omitted, generated from name) */
  metaTitle?: string;
  /** SEO meta description, 140-160 chars ideally */
  metaDescription: string;
  /** Intro paragraphs shown above/below the tool, written for humans and search engines */
  intro: string[];
  /** Optional numbered steps explaining usage */
  howItWorks?: string[];
  faq: FAQItem[];
  /** Key into the tool component registry (src/lib/toolRegistry.tsx) */
  component: string;
  popular?: boolean;
  /** ISO date, used to sort "derniers outils ajoutés" */
  addedAt: string;
  /** Extra keywords for internal search & SEO */
  keywords: string[];
}

const baseTools: Tool[] = [ 
  // ---------------------------------------------------------------- FINANCE
  {
    slug: "calculateur-credit",
    category: "finance",
    name: "Calculateur de crédit",
    shortDescription: "Estimez vos mensualités et le coût total d'un prêt",
    metaDescription:
      "Calculez gratuitement vos mensualités de crédit, le coût total des intérêts et le tableau d'amortissement de votre emprunt en quelques secondes.",
    intro: [
      "Ce calculateur de crédit permet d'estimer la mensualité d'un emprunt à partir du montant emprunté, du taux d'intérêt annuel et de la durée de remboursement. Il est utile pour préparer un achat immobilier, un prêt auto ou un crédit à la consommation avant de contacter une banque.",
      "Le calcul repose sur la formule standard d'amortissement à mensualités constantes, la même que celle utilisée par la majorité des établissements bancaires français. Les résultats sont donnés à titre indicatif et n'incluent pas l'assurance emprunteur ni les frais de dossier.",
    ],
    howItWorks: [
      "Indiquez le montant total emprunté.",
      "Renseignez le taux d'intérêt annuel proposé par votre banque.",
      "Choisissez la durée de remboursement en années.",
      "Consultez instantanément la mensualité, le coût total du crédit et le montant des intérêts.",
    ],
    faq: [
      {
        question: "Ce calcul inclut-il l'assurance emprunteur ?",
        answer:
          "Non, ce calculateur estime uniquement le capital et les intérêts. L'assurance emprunteur, qui varie selon le profil et l'organisme, doit être ajoutée séparément à la mensualité affichée.",
      },
      {
        question: "Le taux utilisé est-il le TAEG ?",
        answer:
          "Le calcul utilise le taux que vous saisissez. Pour un résultat au plus proche de la réalité, utilisez le TAEG (taux annuel effectif global) communiqué par votre banque, qui inclut les principaux frais.",
      },
      {
        question: "Puis-je simuler plusieurs durées de remboursement ?",
        answer:
          "Oui, modifiez simplement la durée pour comparer instantanément l'impact sur la mensualité et le coût total du crédit.",
      },
    ],
    component: "CalculateurCredit",
    popular: true,
    addedAt: "2026-01-05",
    keywords: ["prêt immobilier", "mensualité", "simulation crédit", "taux d'intérêt", "emprunt"],
  },
  {
    slug: "interets-composes",
    category: "finance",
    name: "Calculateur d'intérêts composés",
    shortDescription: "Simulez la croissance d'une épargne dans le temps",
    metaDescription:
      "Calculez l'évolution d'un capital placé avec intérêts composés : capital final, intérêts cumulés et versements réguliers, gratuitement et sans inscription.",
    intro: [
      "Les intérêts composés désignent le mécanisme par lequel les intérêts générés par un placement sont réinvestis et produisent eux-mêmes des intérêts. Sur le long terme, cet effet peut considérablement accélérer la croissance d'une épargne.",
      "Cet outil calcule le capital final d'un placement à partir d'un montant initial, d'un taux de rendement annuel, d'une durée et, si besoin, d'un versement périodique additionnel.",
    ],
    howItWorks: [
      "Renseignez le capital initial investi.",
      "Indiquez le taux de rendement annuel estimé.",
      "Choisissez la durée du placement en années.",
      "Ajoutez, si besoin, un versement mensuel régulier.",
    ],
    faq: [
      {
        question: "Quelle différence avec les intérêts simples ?",
        answer:
          "Les intérêts simples se calculent uniquement sur le capital initial. Les intérêts composés se calculent sur le capital augmenté des intérêts déjà accumulés, ce qui accélère la croissance sur la durée.",
      },
      {
        question: "Le taux de rendement est-il garanti ?",
        answer:
          "Non, ce calculateur applique un taux constant que vous définissez pour la simulation. Les placements réels (bourse, fonds euros, etc.) ont des rendements variables d'une année à l'autre.",
      },
    ],
    component: "CalculateurInteretsComposes",
    popular: true,
    addedAt: "2026-01-06",
    keywords: ["épargne", "placement", "rendement", "capitalisation", "investissement"],
  },
  {
    slug: "calculateur-tva",
    category: "finance",
    name: "Calculateur de TVA",
    shortDescription: "Convertissez un prix HT en TTC et inversement",
    metaDescription:
      "Calculez la TVA, passez d'un prix hors taxes à toutes taxes comprises (et inversement) avec les taux français courants : 20 %, 10 %, 5,5 % et 2,1 %.",
    intro: [
      "Ce calculateur de TVA permet de convertir instantanément un montant hors taxes (HT) en toutes taxes comprises (TTC), ou l'inverse, en appliquant l'un des taux de TVA en vigueur en France.",
      "Il est destiné aux indépendants, commerçants et particuliers souhaitant vérifier rapidement un montant sans ressortir de calculatrice ni de tableur.",
    ],
    faq: [
      {
        question: "Quels sont les taux de TVA disponibles ?",
        answer:
          "L'outil propose les quatre taux appliqués en France métropolitaine : 20 % (taux normal), 10 % et 5,5 % (taux réduits) et 2,1 % (taux particulier, presse et médicaments remboursables).",
      },
      {
        question: "Comment calculer le montant de la TVA seule ?",
        answer:
          "Une fois le prix HT ou TTC saisi, le montant de TVA correspondant est affiché séparément, en plus du prix converti.",
      },
    ],
    component: "CalculateurTVA",
    popular: true,
    addedAt: "2026-01-04",
    keywords: ["TVA France", "prix HT", "prix TTC", "taux de TVA", "facturation"],
  },

  // -------------------------------------------------------------- CALCULS
  {
    slug: "calculateur-imc",
    category: "sante",
    name: "Calculateur d'IMC",
    shortDescription: "Calculez votre indice de masse corporelle",
    metaDescription:
      "Calculez votre IMC (indice de masse corporelle) à partir de votre taille et de votre poids, avec interprétation selon les seuils de l'OMS.",
    intro: [
      "L'indice de masse corporelle (IMC) est un indicateur simple utilisé pour évaluer la corpulence à partir du rapport entre le poids et la taille au carré. Il reste une estimation générale et ne remplace pas un avis médical.",
      "Cet outil calcule votre IMC instantanément et le compare aux catégories définies par l'Organisation mondiale de la santé (insuffisance pondérale, corpulence normale, surpoids, obésité).",
    ],
    faq: [
      {
        question: "Comment est calculé l'IMC ?",
        answer:
          "L'IMC se calcule en divisant le poids en kilogrammes par le carré de la taille en mètres (IMC = poids / taille²).",
      },
      {
        question: "L'IMC est-il fiable pour tout le monde ?",
        answer:
          "L'IMC est un indicateur général qui ne tient pas compte de la masse musculaire, de l'âge ou de la morphologie. Il est moins pertinent pour les sportifs très musclés, les femmes enceintes ou les enfants.",
      },
    ],
    component: "CalculateurIMC",
    popular: true,
    addedAt: "2026-01-03",
    keywords: ["IMC", "indice de masse corporelle", "poids idéal", "santé"],
  },
  {
    slug: "pourcentage",
    category: "mathematiques",
    name: "Calculateur de pourcentage",
    shortDescription: "Calculez un pourcentage, une variation ou un montant",
    metaDescription:
      "Calculez un pourcentage d'un nombre, une variation en pourcentage ou retrouvez un montant total à partir d'un pourcentage, instantanément.",
    intro: [
      "Ce calculateur regroupe les trois opérations de pourcentage les plus recherchées : trouver un pourcentage d'un nombre, calculer la variation en pourcentage entre deux valeurs, et retrouver un montant total à partir d'une part connue.",
    ],
    faq: [
      {
        question: "Comment calculer une augmentation en pourcentage ?",
        answer:
          "La variation en pourcentage se calcule ainsi : ((nouvelle valeur − ancienne valeur) / ancienne valeur) × 100. Un résultat positif indique une hausse, un résultat négatif une baisse.",
      },
      {
        question: "Comment calculer 20 % d'un montant ?",
        answer:
          "Multipliez le montant par 0,20 (ou par 20, puis divisez par 100). Par exemple, 20 % de 150 € équivaut à 150 × 0,20 = 30 €.",
      },
    ],
    component: "CalculateurPourcentage",
    popular: true,
    addedAt: "2026-01-02",
    keywords: ["pourcentage", "calcul de remise", "variation", "règle de trois"],
  },
  {
    slug: "calculateur-age",
    category: "mathematiques",
    name: "Calculateur d'âge",
    shortDescription: "Calculez un âge exact en années, mois et jours",
    metaDescription:
      "Calculez précisément un âge en années, mois et jours à partir d'une date de naissance, ainsi que le nombre total de jours vécus.",
    intro: [
      "Cet outil calcule un âge exact entre une date de naissance et une date de référence (aujourd'hui par défaut), avec le détail en années, mois et jours ainsi que le nombre total de jours écoulés.",
    ],
    faq: [
      {
        question: "Puis-je calculer un âge à une date future ou passée ?",
        answer:
          "Oui, vous pouvez modifier la date de référence pour calculer l'âge qu'une personne aura (ou avait) à une date précise, par exemple pour un dossier administratif.",
      },
    ],
    component: "CalculateurAge",
    addedAt: "2026-01-07",
    keywords: ["âge exact", "date de naissance", "calcul d'âge"],
  },

  // -------------------------------------------------------- CONVERTISSEURS
  {
    slug: "convertisseur-unites",
    category: "conversions",
    name: "Convertisseur d'unités",
    shortDescription: "Longueur, poids, volume, température",
    metaDescription:
      "Convertissez longueurs, poids, volumes et températures entre unités métriques et impériales, instantanément et gratuitement.",
    intro: [
      "Ce convertisseur universel prend en charge les unités de longueur, de poids, de volume et de température les plus courantes, pour passer facilement du système métrique au système impérial et inversement.",
    ],
    faq: [
      {
        question: "Quelles catégories d'unités sont prises en charge ?",
        answer:
          "L'outil couvre actuellement la longueur (mètres, kilomètres, pouces, pieds, miles), le poids (kilogrammes, grammes, livres, onces), le volume (litres, millilitres, gallons) et la température (Celsius, Fahrenheit, Kelvin).",
      },
    ],
    component: "ConvertisseurUnites",
    popular: true,
    addedAt: "2026-01-08",
    keywords: ["convertisseur unités", "kg en livres", "miles en km", "celsius fahrenheit"],
  },

  // ------------------------------------------------------------------ PDF
  {
    slug: "fusionner-pdf",
    category: "pdf",
    name: "Fusionner des PDF",
    shortDescription: "Combinez plusieurs fichiers PDF en un seul document",
    metaDescription:
      "Fusionnez gratuitement plusieurs fichiers PDF en un seul document, directement dans votre navigateur, sans envoi sur un serveur.",
    intro: [
      "Cet outil fusionne plusieurs fichiers PDF dans l'ordre de votre choix pour produire un document unique, prêt à être téléchargé. Le traitement s'effectue entièrement dans votre navigateur : vos fichiers ne quittent jamais votre appareil.",
    ],
    howItWorks: [
      "Sélectionnez ou glissez-déposez plusieurs fichiers PDF.",
      "Réorganisez-les si nécessaire dans l'ordre souhaité.",
      "Cliquez sur « Fusionner » pour générer le document final.",
      "Téléchargez le PDF fusionné.",
    ],
    faq: [
      {
        question: "Mes fichiers sont-ils envoyés sur un serveur ?",
        answer:
          "Non. La fusion est réalisée localement dans votre navigateur grâce à une bibliothèque JavaScript : vos documents ne sont ni envoyés ni stockés sur un serveur.",
      },
      {
        question: "Y a-t-il une limite de taille ou de nombre de fichiers ?",
        answer:
          "L'outil fonctionne pour un usage courant (quelques fichiers de quelques dizaines de mégaoctets). Au-delà, les performances dépendent de la puissance de votre appareil, le traitement se faisant localement.",
      },
    ],
    component: "FusionnerPDF",
    popular: true,
    addedAt: "2026-01-09",
    keywords: ["fusion pdf", "combiner pdf", "assembler pdf gratuit"],
  },

  // --------------------------------------------------------------- IMAGES
  {
    slug: "compresser-image",
    category: "images-medias",
    name: "Compresser une image",
    shortDescription: "Réduisez le poids d'une image sans perte visible",
    metaDescription:
      "Compressez vos images JPG, PNG et WEBP directement dans le navigateur pour réduire leur poids sans envoi sur un serveur externe.",
    intro: [
      "Cet outil réduit le poids d'une image en ajustant sa qualité de compression, ce qui accélère le chargement de vos pages web ou facilite l'envoi par e-mail. Le traitement est effectué localement, dans votre navigateur.",
    ],
    howItWorks: [
      "Importez une image au format JPG, PNG ou WEBP.",
      "Ajustez le niveau de qualité souhaité avec le curseur.",
      "Comparez le poids avant/après en temps réel.",
      "Téléchargez l'image compressée.",
    ],
    faq: [
      {
        question: "Quelle perte de qualité dois-je attendre ?",
        answer:
          "À un niveau de qualité entre 70 % et 85 %, la perte de qualité est généralement peu perceptible à l'œil nu, pour un gain de poids souvent supérieur à 50 %.",
      },
    ],
    component: "CompresserImage",
    popular: true,
    addedAt: "2026-01-10",
    keywords: ["compresser image", "réduire poids image", "optimiser jpg", "compression png"],
  },
  {
    slug: "convertir-image",
    category: "images-medias",
    name: "Convertir une image (JPG, PNG, WEBP)",
    shortDescription: "Changez le format d'une image en un clic",
    metaDescription:
      "Convertissez une image entre les formats JPG, PNG et WEBP directement dans votre navigateur, gratuitement et sans limite.",
    intro: [
      "Ce convertisseur transforme une image d'un format vers un autre parmi JPG, PNG et WEBP. Le format WEBP, plus léger, est particulièrement recommandé pour améliorer les performances d'un site web.",
    ],
    faq: [
      {
        question: "Quel format choisir pour le web ?",
        answer:
          "Le WEBP offre généralement le meilleur rapport qualité/poids pour le web. Le PNG reste préférable pour les images nécessitant une transparence parfaite, et le JPG pour les photographies compatibles partout.",
      },
    ],
    component: "ConvertirImage",
    addedAt: "2026-01-11",
    keywords: ["jpg vers webp", "png vers jpg", "convertisseur image"],
  },

  // ------------------------------------------------------------- INTERNET
  {
    slug: "generateur-mot-de-passe",
    category: "informatique",
    name: "Générateur de mot de passe",
    shortDescription: "Créez un mot de passe fort et aléatoire",
    metaDescription:
      "Générez gratuitement un mot de passe fort, aléatoire et personnalisable : longueur, majuscules, chiffres et symboles, calculé dans votre navigateur.",
    intro: [
      "Ce générateur crée des mots de passe aléatoires et robustes selon les critères que vous choisissez. La génération s'effectue entièrement dans votre navigateur : aucun mot de passe créé n'est transmis ni stocké.",
    ],
    faq: [
      {
        question: "Le mot de passe généré est-il envoyé sur un serveur ?",
        answer:
          "Non, la génération utilise l'API cryptographique sécurisée du navigateur et reste locale à votre appareil.",
      },
      {
        question: "Quelle longueur de mot de passe recommandée ?",
        answer:
          "Il est recommandé d'utiliser au moins 12 à 16 caractères, en combinant majuscules, minuscules, chiffres et symboles, pour une bonne résistance aux attaques par force brute.",
      },
    ],
    component: "GenerateurMotDePasse",
    popular: true,
    addedAt: "2026-01-12",
    keywords: ["générateur mot de passe", "mot de passe sécurisé", "mot de passe aléatoire"],
  },
  {
    slug: "generateur-qr-code",
    category: "informatique",
    name: "Générateur de QR code",
    shortDescription: "Créez un QR code à partir d'un texte ou d'un lien",
    metaDescription:
      "Générez gratuitement un QR code personnalisé à partir d'une URL, d'un texte ou de coordonnées, à télécharger en image PNG haute résolution.",
    intro: [
      "Cet outil génère instantanément un QR code à partir d'un lien, d'un texte libre ou de coordonnées, prêt à être téléchargé et imprimé ou intégré à vos supports de communication.",
    ],
    faq: [
      {
        question: "Le QR code généré expire-t-il ?",
        answer:
          "Non, le QR code encode directement le contenu que vous saisissez et n'a pas de date d'expiration, contrairement à certains services qui utilisent des liens raccourcis dynamiques.",
      },
    ],
    component: "GenerateurQRCode",
    popular: true,
    addedAt: "2026-01-13",
    keywords: ["générateur qr code", "qr code gratuit", "créer qr code url"],
  },

  // ----------------------------------------------------------------- TEXTE
  {
    slug: "compteur-mots",
    category: "education",
    name: "Compteur de mots et caractères",
    shortDescription: "Comptez mots, caractères, phrases et temps de lecture",
    metaDescription:
      "Comptez instantanément le nombre de mots, de caractères, de phrases et estimez le temps de lecture d'un texte, gratuitement et sans limite.",
    intro: [
      "Cet outil analyse un texte collé ou saisi et affiche en temps réel le nombre de mots, de caractères (avec et sans espaces), de phrases et une estimation du temps de lecture moyen.",
    ],
    faq: [
      {
        question: "Comment est estimé le temps de lecture ?",
        answer:
          "Le temps de lecture est estimé sur la base d'une vitesse moyenne de lecture de 200 mots par minute à l'écrit en français.",
      },
    ],
    component: "CompteurMots",
    addedAt: "2026-01-14",
    keywords: ["compteur de mots", "compteur de caractères", "nombre de mots"],
  },
  {
    slug: "generateur-lorem-ipsum",
    category: "informatique",
    name: "Générateur de Lorem Ipsum",
    shortDescription: "Générez du faux texte pour vos maquettes",
    metaDescription:
      "Générez du texte Lorem Ipsum en paragraphes, phrases ou mots pour vos maquettes de site web ou de mise en page, gratuitement.",
    intro: [
      "Le Lorem Ipsum est un texte de substitution utilisé depuis des siècles dans l'imprimerie, aujourd'hui largement employé pour prévisualiser une mise en page avant l'arrivée du contenu définitif.",
    ],
    faq: [
      {
        question: "Pourquoi utiliser du Lorem Ipsum plutôt qu'un vrai texte ?",
        answer:
          "Sa répartition de lettres proche d'un texte réel permet d'évaluer une mise en page sans que le sens du contenu ne détourne l'attention du regard.",
      },
    ],
    component: "GenerateurLoremIpsum",
    addedAt: "2026-01-15",
    keywords: ["lorem ipsum", "faux texte", "générateur de texte"],
  },

  // -------------------------------------------------------- RÉSEAUX SOCIAUX
  {
    slug: "generateur-hashtags",
    category: "informatique",
    name: "Générateur de hashtags",
    shortDescription: "Générez des hashtags pertinents pour vos publications",
    metaDescription:
      "Générez des hashtags pertinents à partir d'un mot-clé pour vos publications Instagram, TikTok ou X, gratuitement et sans inscription.",
    intro: [
      "Cet outil propose des variantes de hashtags à partir d'un ou plusieurs mots-clés, pour accompagner vos publications sur les réseaux sociaux et améliorer leur visibilité.",
    ],
    faq: [
      {
        question: "Combien de hashtags utiliser par publication ?",
        answer:
          "Les recommandations varient selon la plateforme : environ 3 à 5 hashtags ciblés sur X ou Facebook, jusqu'à une vingtaine sur Instagram, en privilégiant toujours la pertinence à la quantité.",
      },
    ],
    component: "GenerateurHashtags",
    addedAt: "2026-01-16",
    keywords: ["générateur hashtags", "hashtags instagram", "hashtags tiktok"],
  },

  // ------------------------------------------------------------- TRAVAIL
  {
    slug: "salaire-brut-net",
    category: "travail",
    name: "Salaire Brut → Net",
    shortDescription: "Estimez votre salaire net à partir du brut",
    metaDescription:
      "Convertissez un salaire brut mensuel en net estimé, selon votre statut cadre ou non-cadre, gratuitement et instantanément.",
    intro: [
      "Ce convertisseur estime le salaire net à partir du salaire brut, en appliquant un taux de charges salariales moyen selon le statut (cadre ou non-cadre). Il s'agit d'une estimation : le taux réel varie selon la convention collective, la mutuelle et d'autres éléments propres à chaque contrat.",
    ],
    faq: [
      {
        question: "Pourquoi le taux diffère-t-il entre cadre et non-cadre ?",
        answer:
          "Les cadres cotisent davantage à la retraite complémentaire (caisse spécifique), ce qui explique un taux de charges salariales généralement plus élevé, autour de 25 % contre environ 22 % pour un non-cadre.",
      },
    ],
    component: "SalaireBrutNet",
    popular: true,
    addedAt: "2026-01-20",
    keywords: ["salaire brut net", "conversion salaire", "net à payer"],
  },
  {
    slug: "salaire-net-brut",
    category: "travail",
    name: "Salaire Net → Brut",
    shortDescription: "Retrouvez le brut correspondant à un net souhaité",
    metaDescription:
      "Calculez le salaire brut nécessaire pour obtenir un salaire net donné, selon votre statut, gratuitement.",
    intro: [
      "Cet outil calcule le salaire brut correspondant à un salaire net souhaité, utile pour préparer une négociation salariale ou vérifier une proposition d'embauche.",
    ],
    faq: [
      {
        question: "Ce résultat est-il garanti par mon employeur ?",
        answer:
          "Non, il s'agit d'une estimation basée sur un taux moyen. Le bulletin de paie réel dépend de nombreux paramètres (mutuelle, avantages en nature, etc.).",
      },
    ],
    component: "SalaireNetBrut",
    addedAt: "2026-01-20",
    keywords: ["salaire net brut", "conversion salaire", "négociation salariale"],
  },
  {
    slug: "conges-payes",
    category: "travail",
    name: "Calculateur de congés payés",
    shortDescription: "Calculez vos jours de congés acquis",
    metaDescription:
      "Calculez vos jours de congés payés acquis selon la règle légale française de 2,5 jours ouvrables par mois travaillé.",
    intro: [
      "En France, un salarié acquiert légalement 2,5 jours ouvrables de congés payés par mois de travail effectif, soit 30 jours ouvrables (5 semaines) pour une année complète. Cet outil calcule vos droits selon le nombre de mois travaillés.",
    ],
    faq: [
      {
        question: "Ma convention collective peut-elle prévoir plus de congés ?",
        answer:
          "Oui, de nombreuses conventions collectives ou accords d'entreprise accordent des jours de congés supplémentaires (ancienneté, jours de fractionnement, etc.), non pris en compte dans ce calcul de base.",
      },
    ],
    component: "CongesPayes",
    addedAt: "2026-01-20",
    keywords: ["congés payés", "jours de congés", "droit du travail"],
  },
  {
    slug: "heures-supplementaires",
    category: "travail",
    name: "Calculateur d'heures supplémentaires",
    shortDescription: "Calculez la rémunération de vos heures sup",
    metaDescription:
      "Calculez le montant de vos heures supplémentaires majorées à 25 % et 50 % selon les taux légaux français.",
    intro: [
      "Cet outil calcule la rémunération des heures supplémentaires selon les taux de majoration légaux en France : 25 % pour les 8 premières heures au-delà de la durée légale hebdomadaire, puis 50 % au-delà, sauf accord d'entreprise prévoyant d'autres taux.",
    ],
    faq: [
      {
        question: "Les taux de majoration sont-ils toujours 25 % et 50 % ?",
        answer:
          "Ce sont les taux légaux par défaut. Un accord de branche ou d'entreprise peut prévoir un taux différent, qui ne peut toutefois pas être inférieur à 10 %.",
      },
    ],
    component: "HeuresSupplementaires",
    addedAt: "2026-01-20",
    keywords: ["heures supplémentaires", "majoration 25", "heures sup salaire"],
  },
  {
    slug: "frais-kilometriques",
    category: "travail",
    name: "Calculateur de frais kilométriques",
    shortDescription: "Estimez vos indemnités kilométriques déductibles",
    metaDescription:
      "Calculez vos frais kilométriques déductibles selon le barème fiscal français, en fonction de la puissance de votre véhicule et de la distance parcourue.",
    intro: [
      "Cet outil applique le barème kilométrique fiscal français pour estimer le montant de vos frais de déplacement professionnel déductibles, selon la puissance fiscale du véhicule et la distance annuelle parcourue.",
    ],
    faq: [
      {
        question: "Le barème est-il le même chaque année ?",
        answer:
          "Le barème kilométrique est publié chaque année par l'administration fiscale et peut légèrement évoluer. Vérifiez le barème en vigueur au moment de votre déclaration.",
      },
    ],
    component: "FraisKilometriques",
    addedAt: "2026-01-20",
    keywords: ["barème kilométrique", "frais kilométriques", "indemnité kilométrique"],
  },
  {
    slug: "salaire-horaire",
    category: "travail",
    name: "Calculateur de salaire horaire",
    shortDescription: "Convertissez un salaire mensuel en taux horaire",
    metaDescription:
      "Calculez votre taux horaire à partir de votre salaire mensuel et du nombre d'heures travaillées par semaine.",
    intro: [
      "Cet outil convertit un salaire mensuel en taux horaire équivalent, à partir du nombre d'heures travaillées par semaine (35h, 39h, temps partiel, etc.).",
    ],
    faq: [],
    component: "SalaireHoraire",
    addedAt: "2026-01-20",
    keywords: ["salaire horaire", "taux horaire", "salaire à l'heure"],
  },

  // ---------------------------------------------------------- IMMOBILIER
  {
    slug: "frais-de-notaire",
    category: "immobilier",
    name: "Calculateur de frais de notaire",
    shortDescription: "Estimez les frais de notaire d'un achat immobilier",
    metaDescription:
      "Calculez les frais de notaire estimés pour un achat immobilier dans l'ancien ou dans le neuf, selon des taux moyens constatés en France.",
    intro: [
      "Les frais de notaire, souvent appelés à tort « frais de notaire », comprennent en réalité majoritairement des taxes reversées à l'État et aux collectivités locales. Cet outil estime leur montant selon que le bien est ancien ou neuf.",
    ],
    faq: [
      {
        question: "Pourquoi les frais sont-ils plus faibles dans le neuf ?",
        answer:
          "Les droits de mutation (la principale composante des frais) sont réduits pour les biens neufs, ce qui explique un taux global d'environ 2 à 3 % contre 7 à 8 % dans l'ancien.",
      },
    ],
    component: "FraisNotaire",
    popular: true,
    addedAt: "2026-01-21",
    keywords: ["frais de notaire", "achat immobilier", "droits de mutation"],
  },
  {
    slug: "rentabilite-locative",
    category: "immobilier",
    name: "Calculateur de rentabilité locative",
    shortDescription: "Évaluez la rentabilité brute et nette d'un investissement",
    metaDescription:
      "Calculez la rentabilité brute et nette d'un investissement locatif à partir du prix d'achat, du loyer et des charges annuelles.",
    intro: [
      "Cet outil calcule la rentabilité brute (loyer annuel / prix d'achat) et la rentabilité nette (après déduction des charges) d'un bien locatif, un indicateur clé avant tout investissement immobilier.",
    ],
    faq: [],
    component: "RentabiliteLocative",
    addedAt: "2026-01-21",
    keywords: ["rentabilité locative", "investissement locatif", "rendement immobilier"],
  },
  {
    slug: "plus-value-immobiliere",
    category: "immobilier",
    name: "Calculateur de plus-value immobilière",
    shortDescription: "Estimez l'imposition sur une plus-value à la revente",
    metaDescription:
      "Estimez l'impôt sur la plus-value immobilière lors de la revente d'une résidence secondaire, selon la durée de détention.",
    intro: [
      "Cet outil estime l'impôt sur le revenu (19 %) et les prélèvements sociaux (17,2 %) applicables à une plus-value immobilière, en tenant compte des abattements progressifs selon la durée de détention du bien.",
    ],
    faq: [
      {
        question: "La résidence principale est-elle concernée ?",
        answer:
          "Non, la résidence principale est exonérée de taxation sur la plus-value. Ce calcul s'applique aux résidences secondaires et biens locatifs.",
      },
    ],
    component: "PlusValueImmobiliere",
    addedAt: "2026-01-21",
    keywords: ["plus-value immobilière", "impôt plus-value", "revente immobilier"],
  },

  // --------------------------------------------------------------- SANTÉ
  {
    slug: "calories-quotidiennes",
    category: "sante",
    name: "Calculateur de calories quotidiennes",
    shortDescription: "Estimez vos besoins caloriques journaliers",
    metaDescription:
      "Calculez votre métabolisme de base et vos besoins caloriques quotidiens selon votre profil et votre niveau d'activité physique.",
    intro: [
      "Cet outil utilise la formule de Mifflin-St Jeor pour estimer votre métabolisme de base (BMR), puis l'ajuste selon votre niveau d'activité physique pour obtenir votre besoin calorique quotidien total (TDEE).",
    ],
    faq: [
      {
        question: "Qu'est-ce que le métabolisme de base ?",
        answer:
          "Le métabolisme de base représente l'énergie minimale nécessaire au corps au repos complet, pour assurer les fonctions vitales (respiration, circulation, etc.).",
      },
    ],
    component: "CaloriesQuotidiennes",
    popular: true,
    addedAt: "2026-01-22",
    keywords: ["calories quotidiennes", "besoin calorique", "métabolisme de base", "TDEE"],
  },
  {
    slug: "poids-ideal",
    category: "sante",
    name: "Calculateur de poids idéal",
    shortDescription: "Estimez un poids de référence selon votre taille",
    metaDescription:
      "Calculez un poids indicatif de référence selon votre taille et votre sexe, à l'aide de la formule de Lorentz.",
    intro: [
      "Cet outil calcule un poids indicatif selon la formule de Lorentz, une estimation parmi d'autres qui ne tient pas compte de la morphologie individuelle ni de la masse musculaire.",
    ],
    faq: [],
    component: "PoidsIdeal",
    addedAt: "2026-01-22",
    keywords: ["poids idéal", "poids de référence", "formule de Lorentz"],
  },

  // --------------------------------------------------------- MATHÉMATIQUES
  {
    slug: "moyenne-ponderee",
    category: "mathematiques",
    name: "Calculateur de moyenne pondérée",
    shortDescription: "Calculez une moyenne avec coefficients",
    metaDescription:
      "Calculez une moyenne pondérée à partir d'une liste de notes et de leurs coefficients respectifs, gratuitement et instantanément.",
    intro: [
      "Cet outil calcule une moyenne pondérée à partir d'une liste de notes, chacune associée à un coefficient, utile pour les bulletins scolaires ou universitaires.",
    ],
    faq: [],
    component: "MoyennePonderee",
    addedAt: "2026-01-23",
    keywords: ["moyenne pondérée", "calcul de moyenne", "coefficients"],
  },
  {
    slug: "regle-de-trois",
    category: "mathematiques",
    name: "Règle de trois",
    shortDescription: "Résolvez une proportion en un clic",
    metaDescription:
      "Résolvez une règle de trois (proportion) à partir de trois valeurs connues, pour trouver la quatrième instantanément.",
    intro: [
      "La règle de trois permet de résoudre un problème de proportionnalité : si A correspond à B, cet outil calcule à combien correspond C.",
    ],
    faq: [],
    component: "RegleDeTrois",
    addedAt: "2026-01-23",
    keywords: ["règle de trois", "proportion", "produit en croix"],
  },
  {
    slug: "simplificateur-fraction",
    category: "mathematiques",
    name: "Simplificateur de fraction",
    shortDescription: "Réduisez une fraction à sa forme la plus simple",
    metaDescription:
      "Simplifiez une fraction à sa forme irréductible et obtenez son équivalent décimal, gratuitement et instantanément.",
    intro: [
      "Cet outil réduit une fraction à sa forme la plus simple (irréductible) en calculant le plus grand diviseur commun du numérateur et du dénominateur, et affiche également son équivalent décimal.",
    ],
    faq: [],
    component: "SimplificateurFraction",
    addedAt: "2026-01-23",
    keywords: ["simplifier une fraction", "fraction irréductible", "PGCD"],
  },

  // ----------------------------------------------------------- CONVERSIONS
  {
    slug: "convertisseur-devises",
    category: "conversions",
    name: "Convertisseur de devises",
    shortDescription: "Convertissez entre euros, dollars, livres et plus",
    metaDescription:
      "Convertissez des devises (euro, dollar, livre sterling, franc suisse, etc.) avec des taux de change à jour, gratuitement.",
    intro: [
      "Ce convertisseur récupère des taux de change actualisés pour convertir un montant entre les principales devises internationales. En cas d'indisponibilité du service de taux, des valeurs indicatives de secours sont utilisées.",
    ],
    faq: [
      {
        question: "Les taux sont-ils garantis pour une transaction bancaire ?",
        answer:
          "Non, les taux affichés sont indicatifs. Votre banque ou bureau de change applique généralement une marge sur le taux de change interbancaire.",
      },
    ],
    component: "ConvertisseurDevises",
    popular: true,
    addedAt: "2026-01-24",
    keywords: ["convertisseur devises", "taux de change", "euro dollar"],
  },
  {
    slug: "convertisseur-surface",
    category: "conversions",
    name: "Convertisseur de surface",
    shortDescription: "m², hectares, ares, pieds carrés, acres",
    metaDescription:
      "Convertissez des surfaces entre mètres carrés, hectares, ares, pieds carrés et acres, instantanément et gratuitement.",
    intro: [
      "Cet outil convertit une surface entre les unités les plus courantes : mètre carré, kilomètre carré, hectare, are, pied carré et acre.",
    ],
    faq: [],
    component: "ConvertisseurSurface",
    addedAt: "2026-01-24",
    keywords: ["convertisseur surface", "m2 en hectare", "pieds carrés"],
  },

  // --------------------------------------------------------------- PDF
  {
    slug: "compresser-pdf",
    category: "pdf",
    name: "Compresser un PDF",
    shortDescription: "Réduisez le poids d'un fichier PDF",
    metaDescription:
      "Compressez un fichier PDF directement dans votre navigateur pour réduire sa taille, sans envoi sur un serveur externe.",
    intro: [
      "Cet outil optimise la structure interne d'un PDF (métadonnées, objets partagés) afin d'en réduire le poids. Le traitement est entièrement local à votre navigateur.",
    ],
    faq: [
      {
        question: "Le gain de poids est-il garanti ?",
        answer:
          "Le gain dépend fortement du contenu du fichier. Un PDF composé essentiellement de texte peut voir son poids réduit significativement, tandis qu'un PDF rempli d'images déjà compressées gagnera moins.",
      },
    ],
    component: "CompresserPDF",
    addedAt: "2026-01-25",
    keywords: ["compresser pdf", "réduire poids pdf", "optimiser pdf"],
  },
  {
    slug: "signer-pdf",
    category: "pdf",
    name: "Signer un PDF",
    shortDescription: "Ajoutez une signature manuscrite à un PDF",
    metaDescription:
      "Signez un document PDF en dessinant votre signature directement dans le navigateur, sans envoi sur un serveur externe.",
    intro: [
      "Cet outil permet de dessiner une signature à la souris ou au doigt, puis de l'apposer sur la dernière page d'un document PDF. Le traitement est entièrement local.",
    ],
    howItWorks: [
      "Importez le PDF à signer.",
      "Dessinez votre signature dans le cadre prévu.",
      "Cliquez sur « Appliquer la signature » pour l'insérer sur la dernière page.",
      "Téléchargez le PDF signé.",
    ],
    faq: [
      {
        question: "Cette signature a-t-elle une valeur légale équivalente à une signature électronique certifiée ?",
        answer:
          "Non, il s'agit d'une signature visuelle apposée sur le document, utile pour un usage courant. Pour une signature électronique juridiquement qualifiée, un service de signature électronique certifié est nécessaire.",
      },
    ],
    component: "SignerPDF",
    addedAt: "2026-01-25",
    keywords: ["signer pdf", "signature pdf en ligne", "apposer signature"],
  },

  // ------------------------------------------------------------ INFORMATIQUE
  {
    slug: "encodeur-base64",
    category: "informatique",
    name: "Encodeur / décodeur Base64",
    shortDescription: "Encodez ou décodez du texte en Base64",
    metaDescription:
      "Encodez du texte en Base64 ou décodez une chaîne Base64 en texte lisible, instantanément et gratuitement.",
    intro: [
      "Le Base64 est un encodage qui permet de représenter des données binaires sous forme de texte. Cet outil encode ou décode du texte en Base64 directement dans votre navigateur.",
    ],
    faq: [],
    component: "EncodeurBase64",
    addedAt: "2026-01-26",
    keywords: ["base64", "encodeur base64", "décodeur base64"],
  },
  {
    slug: "generateur-hash-md5",
    category: "informatique",
    name: "Générateur de hash MD5",
    shortDescription: "Générez l'empreinte MD5 d'un texte",
    metaDescription:
      "Générez l'empreinte de hachage MD5 d'un texte directement dans votre navigateur, gratuitement et sans limite.",
    intro: [
      "Cet outil calcule l'empreinte MD5 d'un texte, utile pour vérifier l'intégrité d'un contenu. MD5 n'est plus recommandé pour des usages nécessitant une sécurité cryptographique forte.",
    ],
    faq: [],
    component: "GenerateurHashMD5",
    addedAt: "2026-01-26",
    keywords: ["hash md5", "générateur md5", "empreinte md5"],
  },
  {
    slug: "generateur-uuid",
    category: "informatique",
    name: "Générateur d'UUID",
    shortDescription: "Générez des identifiants uniques UUID v4",
    metaDescription:
      "Générez un ou plusieurs identifiants uniques universels (UUID v4) directement dans votre navigateur, gratuitement.",
    intro: [
      "Cet outil génère des UUID (identifiants uniques universels) version 4, couramment utilisés en développement pour identifier des ressources de manière unique.",
    ],
    faq: [],
    component: "GenerateurUUID",
    addedAt: "2026-01-26",
    keywords: ["générateur uuid", "uuid v4", "identifiant unique"],
  },

  // -------------------------------------------------------------- ÉNERGIE
  {
    slug: "consommation-electrique",
    category: "energie",
    name: "Calculateur de consommation électrique",
    shortDescription: "Estimez le coût d'utilisation d'un appareil",
    metaDescription:
      "Calculez le coût électrique quotidien, mensuel et annuel d'un appareil selon sa puissance et son temps d'utilisation.",
    intro: [
      "Cet outil estime la consommation et le coût en électricité d'un appareil électroménager ou électronique, à partir de sa puissance en watts, de son temps d'utilisation quotidien et du prix du kWh.",
    ],
    faq: [],
    component: "ConsommationElectrique",
    addedAt: "2026-01-27",
    keywords: ["consommation électrique", "coût électricité", "calcul kwh"],
  },

  // ----------------------------------------------------------- AUTOMOBILE
  {
    slug: "consommation-carburant",
    category: "automobile",
    name: "Calculateur de consommation de carburant",
    shortDescription: "Estimez le coût d'un trajet en voiture",
    metaDescription:
      "Calculez le coût en carburant d'un trajet selon la distance, la consommation moyenne du véhicule et le prix du litre.",
    intro: [
      "Cet outil calcule la quantité de carburant nécessaire et le coût total d'un trajet, à partir de la distance parcourue, de la consommation moyenne du véhicule (L/100km) et du prix du carburant.",
    ],
    faq: [],
    component: "ConsommationCarburant",
    popular: true,
    addedAt: "2026-01-27",
    keywords: ["consommation carburant", "coût trajet voiture", "prix essence"],
  },

  // ------------------------------------------------------- VIE QUOTIDIENNE
  {
    slug: "jours-entre-deux-dates",
    category: "vie-quotidienne",
    name: "Jours entre deux dates",
    shortDescription: "Calculez le nombre de jours entre deux dates",
    metaDescription:
      "Calculez le nombre exact de jours, semaines et mois entre deux dates, gratuitement et instantanément.",
    intro: [
      "Cet outil calcule le nombre de jours entre deux dates, avec l'équivalent en semaines et en mois, utile pour planifier un événement ou vérifier un délai.",
    ],
    faq: [],
    component: "JoursEntreDeuxDates",
    popular: true,
    addedAt: "2026-01-28",
    keywords: ["jours entre deux dates", "calcul de dates", "délai en jours"],
  },
// ------------------------------------------------------------- IMPÔTS
  {
    slug: "impot-revenu",
    category: "impots",
    name: "Calculateur d'impôt sur le revenu",
    shortDescription: "Estimez votre impôt avec le barème 2026 et le quotient familial",
    metaDescription:
      "Estimez votre impôt sur le revenu 2026 (revenus 2025) avec le barème progressif, le quotient familial et la décote. Gratuit, sans inscription.",
    intro: [
      "Cet outil estime l'impôt sur le revenu d'un foyer fiscal à partir du revenu net imposable, de la situation familiale et du nombre d'enfants à charge. Il applique le barème progressif 2026, qui concerne les revenus perçus en 2025 et compte cinq tranches de 0 % à 45 %.",
      "Le calcul tient compte du quotient familial (avec son plafonnement par demi-part supplémentaire) et de la décote réservée aux petits impôts. Le résultat est une estimation : il n'inclut ni les réductions et crédits d'impôt, ni la contribution sur les hauts revenus, ni les situations particulières comme celle du parent isolé.",
    ],
    howItWorks: [
      "Saisissez le revenu net imposable annuel de votre foyer.",
      "Indiquez si vous êtes seul(e) ou en couple.",
      "Renseignez le nombre d'enfants à charge.",
      "Consultez l'impôt estimé, le taux moyen et la tranche marginale d'imposition.",
    ],
    faq: [
      {
        question: "Quel barème est utilisé pour ce calcul ?",
        answer:
          "Le barème de l'impôt sur le revenu 2026, applicable aux revenus perçus en 2025. Il comporte cinq tranches : 0 % jusqu'à 11 600 €, 11 % jusqu'à 29 579 €, 30 % jusqu'à 84 577 €, 41 % jusqu'à 181 917 € et 45 % au-delà, par part de quotient familial.",
      },
      {
        question: "Ce résultat est-il identique à mon avis d'imposition ?",
        answer:
          "Non, c'est une estimation. Votre avis d'imposition tient compte de l'ensemble de vos revenus, de vos charges déductibles, de vos réductions et crédits d'impôt et de votre situation exacte. Pour un montant officiel, utilisez le simulateur de l'administration fiscale sur impots.gouv.fr.",
      },
      {
        question: "Qu'est-ce que le quotient familial ?",
        answer:
          "Le quotient familial divise le revenu imposable du foyer par un nombre de parts qui dépend de la situation familiale. Un célibataire a 1 part, un couple 2 parts, et chacun des deux premiers enfants ajoute une demi-part. L'avantage obtenu grâce aux demi-parts supplémentaires est plafonné.",
      },
      {
        question: "Qu'est-ce que la décote ?",
        answer:
          "La décote est une réduction automatique accordée aux foyers dont l'impôt brut est faible. Elle diminue l'impôt, voire l'annule, lorsque celui-ci reste en dessous d'un seuil fixé chaque année par la loi de finances.",
      },
    ],
    component: "ImpotRevenu",
    popular: true,
    addedAt: "2026-10-18",
    keywords: ["impôt sur le revenu", "barème impôt 2026", "quotient familial", "simulation impôt", "tranche d'imposition"],
  },
  {
    slug: "prelevement-a-la-source",
    category: "impots",
    name: "Calculateur de prélèvement à la source",
    shortDescription: "Calculez le montant prélevé chaque mois sur votre salaire",
    metaDescription:
      "Calculez le montant de votre prélèvement à la source mensuel à partir de votre salaire net imposable et de votre taux, et découvrez votre net après impôt.",
    intro: [
      "Le prélèvement à la source est l'impôt sur le revenu retenu directement sur votre salaire chaque mois. Il se calcule en appliquant un taux à votre salaire net imposable.",
      "Cet outil vous indique combien est prélevé chaque mois, le salaire qu'il vous reste après impôt et le total prélevé sur douze mois, à partir du taux que vous avez saisi.",
    ],
    howItWorks: [
      "Saisissez votre salaire net imposable mensuel, indiqué sur votre bulletin de paie.",
      "Renseignez votre taux de prélèvement à la source.",
      "Consultez le montant prélevé et votre net après impôt.",
    ],
    faq: [
      {
        question: "Où trouver mon taux de prélèvement à la source ?",
        answer:
          "Votre taux figure sur votre bulletin de paie et sur votre avis d'imposition. Vous pouvez aussi le consulter et le modifier depuis votre espace particulier sur impots.gouv.fr.",
      },
      {
        question: "Quelle différence entre taux personnalisé et taux neutre ?",
        answer:
          "Le taux personnalisé est calculé par l'administration à partir de votre dernière déclaration. Le taux neutre (ou non personnalisé) est un taux par défaut qui dépend uniquement du niveau de salaire, sans tenir compte de votre situation familiale ni de vos autres revenus.",
      },
      {
        question: "Sur quel salaire s'applique le taux ?",
        answer:
          "Le taux s'applique au salaire net imposable, qui est différent du net à payer avant impôt affiché sur la fiche de paie. Reprenez la ligne « net imposable » de votre bulletin pour un résultat fiable.",
      },
    ],
    component: "PrelevementSource",
    addedAt: "2026-10-18",
    keywords: ["prélèvement à la source", "taux PAS", "impôt sur salaire", "net après impôt"],
  },
  {
    slug: "credit-impot-emploi-domicile",
    category: "impots",
    name: "Calculateur de crédit d'impôt emploi à domicile",
    shortDescription: "Estimez votre crédit d'impôt pour ménage, garde d'enfants ou aide à domicile",
    metaDescription:
      "Estimez votre crédit d'impôt de 50 % pour l'emploi d'un salarié à domicile : ménage, garde d'enfants, soutien scolaire. Plafonds de dépenses inclus.",
    intro: [
      "L'emploi d'un salarié à domicile ou le recours à un organisme de services à la personne ouvre droit à un crédit d'impôt égal à 50 % des dépenses engagées, dans la limite d'un plafond annuel. Il concerne notamment le ménage, la garde d'enfants, le soutien scolaire ou l'aide aux personnes âgées.",
      "Cet outil calcule ce crédit à partir de vos dépenses annuelles, en appliquant le plafond adapté à votre situation : plafond de base, majoration par enfant ou ascendant à charge, première année d'emploi direct ou invalidité.",
    ],
    howItWorks: [
      "Saisissez le total de vos dépenses annuelles pour l'emploi à domicile.",
      "Indiquez le nombre d'enfants ou d'ascendants à charge.",
      "Sélectionnez votre situation particulière si elle s'applique.",
      "Consultez le crédit d'impôt estimé et le plafond retenu.",
    ],
    faq: [
      {
        question: "Quel est le taux du crédit d'impôt ?",
        answer:
          "Le crédit d'impôt est de 50 % des dépenses retenues. Même si vous ne payez pas d'impôt, il vous est remboursé pour la part qui dépasse votre impôt.",
      },
      {
        question: "Quels sont les plafonds de dépenses ?",
        answer:
          "Le plafond de base est de 12 000 € par an, majoré de 1 500 € par enfant ou ascendant à charge, dans la limite de 15 000 €. Il passe à 15 000 € (18 000 € maximum avec les majorations) la première année d'emploi direct, et à 20 000 € pour une personne invalide ou en situation de handicap.",
      },
      {
        question: "Quelles dépenses sont prises en compte ?",
        answer:
          "Les salaires et cotisations versés à un salarié à domicile, ou les sommes payées à une association ou entreprise de services à la personne agréée, après déduction des aides perçues. Certaines activités ont leurs propres sous-plafonds, par exemple le bricolage ou le jardinage.",
      },
    ],
    component: "CreditImpotEmploiDomicile",
    addedAt: "2026-10-18",
    keywords: ["crédit d'impôt emploi à domicile", "services à la personne", "garde d'enfants impôt", "aide ménagère crédit d'impôt"],
  },

  // ------------------------------------------------------------- VOYAGES
  {
    slug: "fuseaux-horaires",
    category: "voyages",
    name: "Convertisseur de fuseaux horaires",
    shortDescription: "Comparez l'heure entre 25 villes du monde",
    metaDescription:
      "Convertissez une date et une heure entre Paris, New York, Tokyo, Dubaï et 21 autres villes, avec le décalage horaire et le changement d'heure pris en compte.",
    intro: [
      "Ce convertisseur affiche l'heure exacte dans 25 villes du monde à partir d'une date et d'une heure locales. Il indique aussi le décalage horaire par rapport à votre ville de départ, utile pour fixer un appel, une visioconférence ou suivre un vol.",
      "Les changements d'heure été/hiver sont pris en compte automatiquement grâce à la base de fuseaux horaires de votre navigateur : le décalage affiché correspond à la date que vous choisissez.",
    ],
    howItWorks: [
      "Choisissez la ville de départ.",
      "Indiquez la date et l'heure sur place.",
      "Lisez l'heure équivalente dans chaque ville, avec l'écart en heures.",
    ],
    faq: [
      {
        question: "Le changement d'heure été/hiver est-il pris en compte ?",
        answer:
          "Oui. Le décalage est calculé pour la date que vous saisissez, ce qui explique qu'il puisse varier d'une heure selon la période de l'année entre deux villes qui ne changent pas d'heure aux mêmes dates.",
      },
      {
        question: "Pourquoi certains décalages sont-ils en demi-heures ?",
        answer:
          "Quelques pays, comme l'Inde, utilisent un fuseau décalé de 30 minutes par rapport aux fuseaux entiers. L'outil affiche alors un écart comme +4,5 h.",
      },
    ],
    component: "FuseauxHoraires",
    popular: true,
    addedAt: "2026-10-18",
    keywords: ["décalage horaire", "fuseaux horaires", "heure à New York", "convertisseur heure", "heure à Tokyo"],
  },
  {
    slug: "budget-voyage",
    category: "voyages",
    name: "Calculateur de budget voyage",
    shortDescription: "Estimez le coût total d'un séjour, par personne et par jour",
    metaDescription:
      "Calculez le budget de votre voyage : transport, hébergement, repas et activités, avec une marge pour imprévus. Total, coût par personne et par jour.",
    intro: [
      "Ce calculateur additionne les principaux postes de dépense d'un voyage : transport, hébergement, repas, activités, plus une marge pour les imprévus. Il donne le budget total, le coût par personne et le coût par jour.",
      "Il permet de comparer rapidement plusieurs destinations ou durées : modifiez un seul chiffre et voyez l'impact sur l'ensemble du séjour.",
    ],
    howItWorks: [
      "Indiquez le nombre de voyageurs, de jours et de nuits.",
      "Renseignez le transport, l'hébergement par nuit et les repas par jour et par personne.",
      "Ajoutez le budget activités et une marge pour imprévus.",
      "Consultez le budget total, par personne et par jour.",
    ],
    faq: [
      {
        question: "Quelle marge prévoir pour les imprévus ?",
        answer:
          "Beaucoup de voyageurs prévoient entre 10 % et 15 % du budget pour les dépenses imprévues : transports locaux, achats, changement de plan. Ajustez cette marge selon votre destination et votre façon de voyager.",
      },
      {
        question: "L'hébergement est-il compté par personne ou pour tout le groupe ?",
        answer:
          "Pour tout le groupe : saisissez le prix total d'une nuit (chambre ou logement entier), pas le prix par personne. Les repas, eux, se saisissent par personne et par jour.",
      },
    ],
    component: "BudgetVoyage",
    addedAt: "2026-10-18",
    keywords: ["budget voyage", "coût d'un voyage", "calcul budget vacances", "budget séjour"],
  },
  {
    slug: "distance-entre-villes",
    category: "voyages",
    name: "Calculateur de distance entre deux villes",
    shortDescription: "Distance à vol d'oiseau et durée de vol entre deux villes",
    metaDescription:
      "Calculez la distance à vol d'oiseau en kilomètres et en miles entre deux villes du monde, avec une estimation de la durée de vol. Gratuit et instantané.",
    intro: [
      "Cet outil calcule la distance à vol d'oiseau entre deux villes parmi 39 destinations, en France et dans le monde, en kilomètres et en miles. Il estime aussi la durée d'un vol direct.",
      "La distance est calculée à partir des coordonnées géographiques des villes, avec la formule de la haversine qui tient compte de la courbure de la Terre.",
    ],
    howItWorks: [
      "Choisissez la ville de départ.",
      "Choisissez la ville d'arrivée.",
      "Lisez la distance en kilomètres et en miles ainsi que la durée de vol estimée.",
    ],
    faq: [
      {
        question: "Quelle différence avec la distance par la route ?",
        answer:
          "La distance à vol d'oiseau est la ligne droite entre deux points. La distance par la route est en général plus longue, de plusieurs dizaines de pour cent selon le relief et le réseau routier.",
      },
      {
        question: "Comment est estimée la durée de vol ?",
        answer:
          "La durée est calculée avec une vitesse moyenne de 800 km/h. Elle ne comprend ni l'embarquement, ni les escales, ni les écarts de trajectoire, donc un vol réel est souvent un peu plus long.",
      },
    ],
    component: "DistanceVilles",
    addedAt: "2026-10-18",
    keywords: ["distance entre deux villes", "distance à vol d'oiseau", "kilomètres entre villes", "durée de vol"],
    

},...toolsExtra,];

export const tools: Tool[] = baseTools.map((t) => ({ ...t, faq: [...t.faq, ...(faqExtra[t.slug] ?? [])] }));

export function getToolsByCategory(category: CategorySlug): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getTool(category: string, slug: string): Tool | undefined {
  return tools.find((t) => t.category === category && t.slug === slug);
}

export function getPopularTools(limit = 8): Tool[] {
  return tools.filter((t) => t.popular).slice(0, limit);
}

export function getLatestTools(limit = 8): Tool[] {
  return [...tools]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tools.filter((t) => {
    const haystack = [t.name, t.shortDescription, ...t.keywords].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
