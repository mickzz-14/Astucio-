import type { Tool } from "./tools";

export const toolsLot2: Tool[] = [
  {
    slug: "capacite-emprunt",
    category: "immobilier",
    name: "Calculateur de capacité d'emprunt",
    shortDescription: "Estimez le montant que vous pouvez emprunter selon vos revenus",
    metaDescription:
      "Calculez votre capacité d'emprunt immobilier à partir de vos revenus, de vos crédits en cours, du taux, de la durée et du taux d'endettement de 35 %.",
    intro: [
      "Ce calculateur estime le capital que vous pouvez emprunter pour un projet immobilier à partir de vos revenus mensuels, de vos crédits en cours, du taux d'intérêt, de la durée du prêt et de l'assurance emprunteur.",
      "Il s'appuie sur la règle d'un taux d'endettement maximal de 35 %, assurance comprise, recommandée par le Haut Conseil de stabilité financière : la mensualité du nouveau prêt, ajoutée à vos crédits existants, ne doit pas dépasser ce pourcentage de vos revenus.",
    ],
    howItWorks: [
      "Indiquez les revenus nets mensuels de votre foyer et vos crédits en cours.",
      "Renseignez le taux du prêt, sa durée et le taux annuel d'assurance.",
      "Ajoutez votre apport personnel pour connaître votre budget d'achat total.",
      "Consultez votre capacité d'emprunt et la mensualité maximale.",
    ],
    faq: [
      {
        question: "Quel taux d'endettement les banques acceptent-elles ?",
        answer:
          "La recommandation actuelle est de ne pas dépasser 35 % des revenus, assurance emprunteur incluse. Les banques disposent d'une marge de flexibilité limitée et étudient aussi la stabilité de vos revenus et votre épargne.",
      },
      {
        question: "L'apport est-il compris dans la capacité d'emprunt ?",
        answer:
          "Non. La capacité d'emprunt correspond au capital que la banque peut vous prêter. Votre budget d'achat total est la somme de cette capacité et de votre apport personnel, avant frais de notaire.",
      },
      {
        question: "Ce résultat vaut-il accord de prêt ?",
        answer:
          "Non, c'est une estimation indicative. Une banque examine votre dossier complet (contrat de travail, épargne, charges, situation familiale) avant de vous proposer une offre de prêt.",
      },
    ],
    component: "CapaciteEmprunt",
    addedAt: "2026-10-18",
    keywords: ["capacité d'emprunt", "taux d'endettement", "prêt immobilier", "combien puis-je emprunter"],
  },
  {
    slug: "marge-commerciale",
    category: "finance",
    name: "Calculateur de marge commerciale",
    shortDescription: "Calculez marge, taux de marge, taux de marque et coefficient",
    metaDescription:
      "Calculez votre marge commerciale, le taux de marge, le taux de marque et le coefficient multiplicateur à partir du coût d'achat et du prix de vente HT.",
    intro: [
      "Ce calculateur détermine la marge brute d'un produit à partir de son coût d'achat hors taxes et de son prix de vente hors taxes. Il affiche le taux de marge, le taux de marque et le coefficient multiplicateur.",
      "Il permet aussi de faire le calcul inverse : à partir d'un taux de marge visé, il indique le prix de vente HT à pratiquer. C'est un outil utile pour les commerçants, les revendeurs et les entrepreneurs qui fixent leurs prix.",
    ],
    howItWorks: [
      "Saisissez le coût d'achat HT et le prix de vente HT.",
      "Consultez la marge, le taux de marge, le taux de marque et le coefficient.",
      "Indiquez un taux de marge visé pour obtenir le prix de vente correspondant.",
    ],
    faq: [
      {
        question: "Quelle différence entre taux de marge et taux de marque ?",
        answer:
          "Le taux de marge rapporte la marge au coût d'achat (marge / coût d'achat). Le taux de marque la rapporte au prix de vente (marge / prix de vente HT). Pour une même opération, le taux de marque est toujours inférieur au taux de marge.",
      },
      {
        question: "Faut-il raisonner en HT ou en TTC ?",
        answer:
          "Toujours en hors taxes. La TVA est collectée pour l'État et ne constitue pas un revenu : intégrer le TTC fausserait la marge réelle.",
      },
      {
        question: "Qu'est-ce que le coefficient multiplicateur ?",
        answer:
          "C'est le rapport entre le prix de vente HT et le coût d'achat HT. Un coefficient de 1,5 signifie que le prix de vente est égal à une fois et demie le coût d'achat.",
      },
    ],
    component: "MargeCommerciale",
    addedAt: "2026-10-18",
    keywords: ["marge commerciale", "taux de marge", "taux de marque", "coefficient multiplicateur", "prix de vente"],
  },
  {
    slug: "remise-solde",
    category: "finance",
    name: "Calculateur de remise et de soldes",
    shortDescription: "Calculez le prix après réduction, y compris avec une 2e démarque",
    metaDescription:
      "Calculez le prix final après une remise ou des soldes, avec une deuxième démarque possible, ainsi que le montant économisé et la remise réelle.",
    intro: [
      "Cet outil calcule le prix final d'un article après une remise en pourcentage, et même après une deuxième démarque qui s'ajoute à la première. Il indique aussi le montant économisé et la remise réellement obtenue.",
      "Les remises successives ne s'additionnent pas : une deuxième démarque s'applique sur le prix déjà réduit. Le calculateur effectue ce calcul à votre place.",
    ],
    howItWorks: [
      "Saisissez le prix initial de l'article.",
      "Indiquez le pourcentage de remise, et une deuxième démarque si elle existe.",
      "Lisez le prix final, l'économie réalisée et la remise réelle.",
    ],
    faq: [
      {
        question: "20 % puis 10 % de remise, est-ce 30 % au total ?",
        answer:
          "Non. La deuxième remise s'applique sur le prix déjà réduit. Pour 20 % puis 10 %, la remise réelle est de 28 %, car le prix est multiplié par 0,80 puis par 0,90.",
      },
      {
        question: "Comment calculer rapidement une remise de tête ?",
        answer:
          "Pour 10 %, décalez la virgule d'un rang. Pour 20 %, doublez ce résultat. Pour 50 %, divisez le prix par deux. Retirez ensuite le montant obtenu du prix initial.",
      },
    ],
    component: "RemiseSolde",
    addedAt: "2026-10-18",
    keywords: ["calcul remise", "prix soldé", "pourcentage réduction", "calcul des soldes"],
  },
  {
    slug: "objectif-epargne",
    category: "finance",
    name: "Calculateur d'objectif d'épargne",
    shortDescription: "Trouvez la somme à mettre de côté chaque mois pour atteindre un objectif",
    metaDescription:
      "Calculez combien épargner chaque mois pour atteindre un objectif financier, selon la durée, le capital de départ et le rendement annuel de votre placement.",
    intro: [
      "Ce calculateur détermine la somme à épargner chaque mois pour atteindre un objectif (voyage, apport immobilier, achat important) dans un délai donné, en tenant compte du capital déjà épargné et du rendement de votre placement.",
      "Il indique le total versé et la part des intérêts gagnés. Le calcul suppose un rendement constant et des versements réguliers en fin de mois : les placements réels varient d'une année à l'autre.",
    ],
    howItWorks: [
      "Indiquez l'objectif à atteindre et le capital déjà épargné.",
      "Choisissez la durée en années et le rendement annuel estimé.",
      "Lisez la somme à épargner chaque mois, le total versé et les intérêts gagnés.",
    ],
    faq: [
      {
        question: "Quel rendement utiliser pour la simulation ?",
        answer:
          "Utilisez le taux de votre placement actuel (livret, assurance vie, etc.). En cas de doute, une simulation à 0 % donne le montant minimum à épargner sans compter sur les intérêts.",
      },
      {
        question: "Les versements sont-ils comptés en début ou en fin de mois ?",
        answer:
          "En fin de mois. Un versement en début de mois rapporterait légèrement plus d'intérêts, ce qui réduit un peu l'effort d'épargne nécessaire.",
      },
    ],
    component: "ObjectifEpargne",
    addedAt: "2026-10-18",
    keywords: ["objectif d'épargne", "épargne mensuelle", "combien épargner", "simulation épargne"],
  },
  {
    slug: "pourboire-addition",
    category: "vie-quotidienne",
    name: "Calculateur de pourboire et partage d'addition",
    shortDescription: "Répartissez l'addition et le pourboire entre plusieurs personnes",
    metaDescription:
      "Calculez le pourboire et partagez l'addition d'un restaurant entre plusieurs personnes : montant du pourboire, total à payer et part de chacun.",
    intro: [
      "Cet outil calcule le pourboire à partir du montant de l'addition et du pourcentage choisi, puis répartit le total à parts égales entre les convives.",
      "En France, le service est compris dans les prix affichés au restaurant et le pourboire reste facultatif. À l'étranger, notamment aux États-Unis et au Canada, il est en revanche attendu et souvent compris entre 15 % et 20 %.",
    ],
    howItWorks: [
      "Saisissez le montant de l'addition.",
      "Choisissez le pourcentage de pourboire.",
      "Indiquez le nombre de personnes pour obtenir la part de chacun.",
    ],
    faq: [
      {
        question: "Faut-il laisser un pourboire en France ?",
        answer:
          "Non, le service est inclus dans le prix affiché. Un pourboire est facultatif et laissé en remerciement d'un bon service, souvent entre 5 % et 10 % de l'addition.",
      },
      {
        question: "Le pourboire est-il calculé sur le prix HT ou TTC ?",
        answer:
          "En général sur le montant de l'addition tel qu'il est affiché, c'est-à-dire toutes taxes comprises. Cet outil applique le pourcentage au montant que vous saisissez.",
      },
    ],
    component: "PourboireAddition",
    addedAt: "2026-10-18",
    keywords: ["calcul pourboire", "partager l'addition", "pourboire restaurant", "diviser l'addition"],
  },
  {
    slug: "jours-ouvres",
    category: "travail",
    name: "Calculateur de jours ouvrés entre deux dates",
    shortDescription: "Comptez les jours ouvrés avec ou sans jours fériés français",
    metaDescription:
      "Calculez le nombre de jours ouvrés entre deux dates, avec déduction automatique des week-ends et des jours fériés français, gratuitement et instantanément.",
    intro: [
      "Ce calculateur compte les jours ouvrés entre deux dates, du lundi au vendredi, en retirant les week-ends et, si vous le souhaitez, les jours fériés français : 1er janvier, lundi de Pâques, 1er mai, 8 mai, Ascension, lundi de Pentecôte, 14 juillet, 15 août, 1er novembre, 11 novembre et 25 décembre.",
      "Il est utile pour estimer un délai de livraison, un préavis, une durée de mission ou un nombre de jours de travail. Les dates de début et de fin sont incluses dans le calcul.",
    ],
    howItWorks: [
      "Choisissez la date de début et la date de fin.",
      "Indiquez si les jours fériés doivent être déduits.",
      "Consultez le nombre de jours ouvrés, de jours calendaires, de week-ends et de fériés.",
    ],
    faq: [
      {
        question: "Quelle différence entre jours ouvrés et jours ouvrables ?",
        answer:
          "Les jours ouvrés sont les jours travaillés dans l'entreprise, en général du lundi au vendredi. Les jours ouvrables comprennent tous les jours de la semaine sauf le dimanche et les jours fériés chômés, donc le samedi inclus.",
      },
      {
        question: "Les jours fériés d'Alsace-Moselle sont-ils pris en compte ?",
        answer:
          "Non. L'outil applique les jours fériés nationaux. L'Alsace-Moselle compte deux jours fériés supplémentaires, le Vendredi saint et le 26 décembre, qui ne sont pas déduits ici.",
      },
    ],
    component: "JoursOuvres",
    addedAt: "2026-10-18",
    keywords: ["jours ouvrés", "jours ouvrés entre deux dates", "jours fériés France", "calcul délai"],
  },
  {
    slug: "sommeil-cycles",
    category: "sante",
    name: "Calculateur de cycles de sommeil",
    shortDescription: "Trouvez l'heure idéale pour vous coucher ou vous réveiller",
    metaDescription:
      "Calculez votre heure de coucher ou de réveil idéale en fonction des cycles de sommeil de 90 minutes pour vous réveiller plus facilement.",
    intro: [
      "Une nuit de sommeil est composée de cycles d'environ 90 minutes. Se réveiller en fin de cycle plutôt qu'au milieu aide à se sentir plus reposé. Ce calculateur propose des heures de coucher ou de réveil qui respectent ces cycles.",
      "Il prévoit une quinzaine de minutes pour s'endormir. Les durées de cycle varient d'une personne à l'autre : le résultat est une indication, pas une mesure précise de votre sommeil.",
    ],
    howItWorks: [
      "Choisissez si vous voulez calculer votre heure de coucher ou de réveil.",
      "Indiquez l'heure à laquelle vous devez vous lever, ou celle à laquelle vous vous couchez.",
      "Choisissez l'heure proposée qui correspond à la durée de sommeil souhaitée.",
    ],
    faq: [
      {
        question: "Combien d'heures dormir par nuit ?",
        answer:
          "Les recommandations pour un adulte tournent autour de 7 à 9 heures par nuit, soit environ 5 à 6 cycles. Les besoins varient selon l'âge et la personne.",
      },
      {
        question: "Les cycles durent-ils toujours exactement 90 minutes ?",
        answer:
          "Non, 90 minutes est une moyenne. Un cycle peut durer de 80 à 110 minutes selon les personnes et même d'une nuit à l'autre, c'est pourquoi ce calcul reste une estimation.",
      },
    ],
    component: "SommeilCycles",
    addedAt: "2026-10-18",
    keywords: ["cycles de sommeil", "heure de coucher", "calculateur sommeil", "heure de réveil"],
  },
  {
    slug: "frequence-cardiaque",
    category: "sante",
    name: "Calculateur de fréquence cardiaque maximale",
    shortDescription: "Estimez votre FC max et vos zones d'entraînement",
    metaDescription:
      "Estimez votre fréquence cardiaque maximale selon votre âge et obtenez vos 5 zones d'entraînement pour la course, le vélo ou le fitness, gratuitement.",
    intro: [
      "Ce calculateur estime votre fréquence cardiaque maximale (FC max) avec la formule classique 220 moins l'âge, puis en déduit cinq zones d'entraînement exprimées en pourcentage de cette valeur, de l'effort très léger à l'effort maximal.",
      "La formule est une moyenne statistique : la FC max réelle varie d'une personne à l'autre. En cas de doute, de reprise du sport ou de problème cardiaque, demandez conseil à un médecin avant de vous entraîner à haute intensité.",
    ],
    howItWorks: [
      "Saisissez votre âge.",
      "Lisez votre fréquence cardiaque maximale estimée.",
      "Repérez la zone qui correspond à l'intensité de votre séance.",
    ],
    faq: [
      {
        question: "La formule 220 moins l'âge est-elle précise ?",
        answer:
          "Elle donne une estimation correcte pour la population générale mais peut s'écarter de plusieurs dizaines de battements pour un individu. Un test d'effort encadré reste la méthode la plus fiable.",
      },
      {
        question: "Dans quelle zone s'entraîner pour brûler des graisses ou progresser en endurance ?",
        answer:
          "L'endurance fondamentale, entre 60 % et 70 % de la FC max, est la zone de base pour développer l'endurance. Les zones plus hautes sont réservées à des séances plus courtes et plus intenses.",
      },
    ],
    component: "FrequenceCardiaque",
    addedAt: "2026-10-18",
    keywords: ["fréquence cardiaque maximale", "FC max", "zones d'entraînement", "rythme cardiaque sport"],
  },
  {
    slug: "convertisseur-octets",
    category: "informatique",
    name: "Convertisseur d'octets (Ko, Mo, Go, To)",
    shortDescription: "Convertissez octets, kilooctets, mégaoctets, gigaoctets et téraoctets",
    metaDescription:
      "Convertissez des octets en Ko, Mo, Go, To et en unités binaires Kio, Mio, Gio, Tio, instantanément et gratuitement dans votre navigateur.",
    intro: [
      "Ce convertisseur passe d'une unité de stockage informatique à une autre : octet, Ko, Mo, Go, To, mais aussi les unités binaires Kio, Mio, Gio et Tio.",
      "Les unités décimales (Ko, Mo, Go) utilisent des multiples de 1 000, alors que les unités binaires (Kio, Mio, Gio) utilisent des multiples de 1 024. Cette différence explique pourquoi un disque de 1 To affiché par un fabricant paraît plus petit une fois branché sur un ordinateur.",
    ],
    howItWorks: [
      "Saisissez une valeur.",
      "Choisissez son unité de départ.",
      "Lisez la conversion dans toutes les unités.",
    ],
    faq: [
      {
        question: "Quelle différence entre Go et Gio ?",
        answer:
          "Un gigaoctet (Go) vaut 1 000 000 000 octets, un gibioctet (Gio) vaut 1 073 741 824 octets. Le Gio est environ 7 % plus grand que le Go.",
      },
      {
        question: "Pourquoi mon disque de 1 To affiche-t-il moins d'espace ?",
        answer:
          "Les fabricants annoncent 1 To en base 1 000, soit 1 000 000 000 000 octets, alors que certains systèmes affichent la taille en base 1 024, soit environ 931 Gio, tout en écrivant Go.",
      },
    ],
    component: "ConvertisseurOctets",
    addedAt: "2026-10-18",
    keywords: ["convertisseur octets", "Go en Mo", "Mo en Ko", "gigaoctet", "conversion stockage"],
  },
  {
    slug: "convertisseur-couleurs",
    category: "informatique",
    name: "Convertisseur de couleurs HEX, RGB et HSL",
    shortDescription: "Convertissez une couleur entre HEX, RGB et HSL",
    metaDescription:
      "Convertissez une couleur entre les formats HEX, RGB et HSL, avec sélecteur de couleur et aperçu, pour vos projets web, design et CSS.",
    intro: [
      "Ce convertisseur transforme une couleur d'un format à un autre : code HEX (#2563EB), valeurs RGB (rouge, vert, bleu) et HSL (teinte, saturation, luminosité). Un aperçu et un sélecteur de couleur facilitent le choix.",
      "Les trois formats sont utilisés en CSS et dans les outils de design. Le HEX est le plus courant dans les maquettes, le RGB sert à décrire une couleur par ses canaux, et le HSL est pratique pour obtenir des variantes plus claires ou plus foncées.",
    ],
    howItWorks: [
      "Saisissez un code HEX, modifiez les canaux RGB ou utilisez le sélecteur de couleur.",
      "Observez l'aperçu de la couleur.",
      "Copiez la valeur dans le format dont vous avez besoin.",
    ],
    faq: [
      {
        question: "Quelle est la différence entre HEX et RGB ?",
        answer:
          "Ce sont deux écritures de la même couleur. Le HEX l'écrit en base 16 (#RRGGBB), le RGB en trois nombres de 0 à 255. Par exemple #FF0000 correspond à rgb(255, 0, 0).",
      },
      {
        question: "Le code HEX à trois caractères est-il accepté ?",
        answer:
          "Oui. Une écriture courte comme #F80 est automatiquement développée en #FF8800.",
      },
    ],
    component: "ConvertisseurCouleurs",
    addedAt: "2026-10-18",
    keywords: ["convertisseur couleur", "hex en rgb", "rgb en hex", "hsl", "code couleur css"],
  },
  {
    slug: "nombres-romains",
    category: "education",
    name: "Convertisseur de chiffres romains",
    shortDescription: "Convertissez un nombre en chiffres romains et inversement",
    metaDescription:
      "Convertissez un nombre de 1 à 3999 en chiffres romains, ou des chiffres romains en nombre, gratuitement, avec vérification de l'écriture correcte.",
    intro: [
      "Ce convertisseur transforme un nombre entier de 1 à 3999 en chiffres romains, et traduit des chiffres romains en nombre. Il refuse les écritures incorrectes, comme IIII à la place de IV.",
      "Les chiffres romains s'écrivent avec sept symboles : I (1), V (5), X (10), L (50), C (100), D (500) et M (1 000). On les rencontre sur les cadrans, dans les numéros de siècles, de chapitres ou de rois.",
    ],
    howItWorks: [
      "Pour convertir un nombre, saisissez-le dans le champ de gauche.",
      "Pour traduire des chiffres romains, saisissez-les dans le champ de droite.",
      "Le résultat s'affiche immédiatement sous chaque champ.",
    ],
    faq: [
      {
        question: "Pourquoi ne peut-on pas dépasser 3999 ?",
        answer:
          "Les chiffres romains classiques n'ont pas de symbole au-dessus de M (1 000), et la règle interdit de répéter un symbole plus de trois fois. Le plus grand nombre écrit sans notation spéciale est donc MMMCMXCIX, soit 3999.",
      },
      {
        question: "Y a-t-il un zéro en chiffres romains ?",
        answer:
          "Non, le système romain ne possède pas de symbole pour le zéro. C'est pourquoi la conversion commence à 1.",
      },
    ],
    component: "NombresRomains",
    addedAt: "2026-10-18",
    keywords: ["chiffres romains", "nombres romains", "convertisseur romain", "XIV en chiffre"],
  },
  {
    slug: "equation-second-degre",
    category: "mathematiques",
    name: "Résolveur d'équation du second degré",
    shortDescription: "Résolvez ax² + bx + c = 0 avec le discriminant",
    metaDescription:
      "Résolvez une équation du second degré ax² + bx + c = 0 : discriminant, solutions réelles ou complexes, calculées instantanément et gratuitement.",
    intro: [
      "Ce résolveur calcule les solutions d'une équation du second degré de la forme ax² + bx + c = 0. Il affiche le discriminant, le nombre de solutions et leurs valeurs.",
      "Si le discriminant est positif, l'équation a deux solutions réelles. S'il est nul, elle a une solution double. S'il est négatif, elle n'a pas de solution réelle, et l'outil affiche alors les deux solutions complexes.",
    ],
    howItWorks: [
      "Saisissez les coefficients a, b et c de l'équation.",
      "Consultez la valeur du discriminant Δ = b² − 4ac.",
      "Lisez les solutions affichées.",
    ],
    faq: [
      {
        question: "Comment calcule-t-on les solutions ?",
        answer:
          "On calcule d'abord le discriminant Δ = b² − 4ac. Si Δ est positif, les solutions sont x = (−b − √Δ) / 2a et x = (−b + √Δ) / 2a. Si Δ est nul, la solution double est x = −b / 2a.",
      },
      {
        question: "Que se passe-t-il si a est égal à 0 ?",
        answer:
          "L'équation n'est plus du second degré : elle devient bx + c = 0, avec pour solution x = −c / b. L'outil le détecte et résout alors cette équation du premier degré.",
      },
    ],
    component: "EquationSecondDegre",
    addedAt: "2026-10-18",
    keywords: ["équation second degré", "discriminant", "résoudre équation", "racines polynôme"],
  },
];
