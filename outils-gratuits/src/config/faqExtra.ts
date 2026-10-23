import type { FAQItem } from "./tools";

/**
 * Questions fréquentes ajoutées aux outils existants, par slug.
 * Elles sont ajoutées à la suite des questions déjà présentes dans tools.ts.
 */
export const faqExtra: Record<string, FAQItem[]> = {
  "salaire-horaire": [
    {
      question: "Comment calculer le salaire horaire à partir du salaire mensuel ?",
      answer:
        "On divise le salaire mensuel par le nombre d'heures payées par mois. Ce nombre est obtenu en multipliant les heures hebdomadaires par 52 semaines, puis en divisant par 12 mois.",
    },
    {
      question: "Pourquoi un mois de travail à 35 heures compte-t-il 151,67 heures ?",
      answer:
        "Parce que 35 heures × 52 semaines ÷ 12 mois donne environ 151,67 heures par mois. C'est la base de la mensualisation du salaire pour un temps plein à 35 heures.",
    },
    {
      question: "Le résultat est-il brut ou net ?",
      answer:
        "Il dépend du salaire que vous saisissez : un salaire brut donne un taux horaire brut, un salaire net donne un taux horaire net. Pour comparer avec le SMIC horaire, utilisez le brut, et vérifiez le montant en vigueur, car il est revalorisé chaque année.",
    },
  ],
  "rentabilite-locative": [
    {
      question: "Quelle différence entre rentabilité brute et rentabilité nette ?",
      answer:
        "La rentabilité brute rapporte le loyer annuel au prix d'achat du bien. La rentabilité nette tient compte des charges qui pèsent sur le propriétaire, comme la taxe foncière, les charges de copropriété non récupérables, l'assurance, les frais de gestion et les travaux.",
    },
    {
      question: "Quelle rentabilité considère-t-on comme bonne ?",
      answer:
        "Cela dépend de la ville et du type de bien. Les grandes villes affichent souvent des rendements plus faibles que les villes moyennes, en contrepartie d'une demande locative plus stable. Beaucoup d'investisseurs comparent plusieurs biens plutôt que de viser un chiffre unique.",
    },
    {
      question: "Les impôts sont-ils pris en compte dans ce calcul ?",
      answer:
        "Non. L'outil n'inclut ni l'impôt sur les revenus fonciers, ni les prélèvements sociaux, qui diminuent le rendement final selon votre régime fiscal (micro-foncier, régime réel, location meublée).",
    },
  ],
  "poids-ideal": [
    {
      question: "Comment fonctionne la formule de Lorentz ?",
      answer:
        "Pour un homme, elle retire 100 à la taille en centimètres, puis soustrait le quart de l'écart entre la taille et 150 cm. Pour une femme, elle soustrait l'écart divisé par 2,5. Le résultat est un poids de référence en kilogrammes.",
    },
    {
      question: "Existe-t-il un poids idéal unique pour chaque personne ?",
      answer:
        "Non. Le poids qui convient à une personne dépend de sa morphologie, de sa masse musculaire, de son âge et de son état de santé. Le résultat est un repère indicatif, pas un objectif médical.",
    },
    {
      question: "Quelle différence avec l'IMC ?",
      answer:
        "L'IMC rapporte le poids au carré de la taille. L'Organisation mondiale de la santé considère une corpulence normale entre 18,5 et 24,9. Le poids de la formule de Lorentz est un autre repère, calculé différemment.",
    },
  ],
  "moyenne-ponderee": [
    {
      question: "Comment calculer une moyenne pondérée ?",
      answer:
        "On multiplie chaque note par son coefficient, on additionne les résultats, puis on divise par la somme des coefficients. Par exemple, 14 avec un coefficient 2 et 10 avec un coefficient 1 donnent (28 + 10) ÷ 3, soit 12,67.",
    },
    {
      question: "Quelle différence entre moyenne simple et moyenne pondérée ?",
      answer:
        "Dans une moyenne simple, toutes les valeurs comptent autant. Dans une moyenne pondérée, chaque valeur a un poids différent, ce qui permet de donner plus d'importance à certaines notes.",
    },
    {
      question: "Puis-je mélanger des notes sur 10 et sur 20 ?",
      answer:
        "Il vaut mieux ramener toutes les notes sur la même base avant de calculer, par exemple sur 20, pour que la moyenne ait un sens.",
    },
  ],
  "regle-de-trois": [
    {
      question: "Comment fonctionne la règle de trois ?",
      answer:
        "C'est un produit en croix : si A correspond à B, alors C correspond à (B × C) ÷ A. Par exemple, si 3 kg coûtent 12 €, alors 5 kg coûtent 12 × 5 ÷ 3, soit 20 €.",
    },
    {
      question: "Que faire quand la proportionnalité est inverse ?",
      answer:
        "L'outil applique la règle de trois directe. Dans une situation inversement proportionnelle (plus il y a de personnes, moins il faut de temps), le calcul devient (A × B) ÷ C.",
    },
    {
      question: "Quand peut-on utiliser une règle de trois ?",
      answer:
        "Dès que deux grandeurs évoluent dans le même rapport : recettes de cuisine, prix au poids, distances sur une carte, conversions de devises à taux fixe.",
    },
  ],
  "simplificateur-fraction": [
    {
      question: "Qu'est-ce qu'une fraction irréductible ?",
      answer:
        "C'est une fraction dont le numérateur et le dénominateur n'ont aucun diviseur commun autre que 1. On ne peut donc plus la simplifier.",
    },
    {
      question: "Comment simplifier une fraction ?",
      answer:
        "On divise le numérateur et le dénominateur par leur plus grand diviseur commun (PGCD). Par exemple, pour 12/18, le PGCD est 6 et la fraction simplifiée est 2/3.",
    },
    {
      question: "Peut-on avoir un dénominateur égal à zéro ?",
      answer:
        "Non, la division par zéro n'est pas définie : une fraction dont le dénominateur est nul n'a pas de valeur.",
    },
  ],
  "convertisseur-surface": [
    {
      question: "Combien de mètres carrés dans un hectare ?",
      answer:
        "Un hectare vaut 10 000 m². Un are vaut 100 m², et un kilomètre carré vaut 100 hectares.",
    },
    {
      question: "Combien vaut un acre en mètres carrés ?",
      answer:
        "Un acre équivaut à environ 4 046,86 m². C'est une unité utilisée surtout dans les pays anglo-saxons pour mesurer les terrains.",
    },
    {
      question: "Quelle est la valeur d'un pied carré ?",
      answer:
        "Un pied carré équivaut à environ 0,0929 m². Il est surtout employé pour les surfaces immobilières aux États-Unis.",
    },
  ],
  "encodeur-base64": [
    {
      question: "Qu'est-ce que le Base64 ?",
      answer:
        "C'est un encodage qui représente des données binaires avec 64 caractères : les lettres majuscules et minuscules, les chiffres, le plus et la barre oblique. Il sert à transmettre des données dans des contextes qui n'acceptent que du texte.",
    },
    {
      question: "Le Base64 est-il un chiffrement ?",
      answer:
        "Non. C'est un simple encodage, que n'importe qui peut décoder. Il ne protège pas les données et ne doit jamais servir à cacher un mot de passe.",
    },
    {
      question: "Pourquoi le texte encodé est-il plus long ?",
      answer:
        "Chaque groupe de 3 octets est représenté par 4 caractères, ce qui augmente la taille d'environ un tiers.",
    },
  ],
  "generateur-hash-md5": [
    {
      question: "Qu'est-ce qu'une empreinte MD5 ?",
      answer:
        "C'est une suite de 32 caractères hexadécimaux, calculée à partir d'un texte. Le même texte donne toujours la même empreinte, et une modification minime du texte la change entièrement.",
    },
    {
      question: "MD5 est-il adapté pour stocker des mots de passe ?",
      answer:
        "Non. MD5 est trop rapide à calculer et des collisions sont connues. Pour des mots de passe, on utilise des algorithmes dédiés comme bcrypt, scrypt ou Argon2.",
    },
    {
      question: "Peut-on retrouver le texte d'origine à partir d'une empreinte ?",
      answer:
        "Le calcul est à sens unique, mais des tables et des dictionnaires permettent de retrouver des textes simples ou des mots de passe faibles. Plus le texte d'origine est long et aléatoire, plus c'est difficile.",
    },
  ],
  "generateur-uuid": [
    {
      question: "Qu'est-ce qu'un UUID version 4 ?",
      answer:
        "C'est un identifiant de 128 bits généré de façon aléatoire, écrit en cinq groupes de caractères hexadécimaux séparés par des tirets (8-4-4-4-12).",
    },
    {
      question: "Deux UUID peuvent-ils être identiques ?",
      answer:
        "En théorie oui, mais la probabilité est négligeable : un UUID v4 contient 122 bits aléatoires, ce qui représente un nombre de valeurs possibles astronomique.",
    },
    {
      question: "À quoi servent les UUID ?",
      answer:
        "Ils servent à identifier de façon unique un enregistrement en base de données, un fichier ou une session, sans coordination entre systèmes. Ils identifient, mais ne remplacent pas un mot de passe.",
    },
  ],
  "consommation-electrique": [
    {
      question: "Comment calculer la consommation d'un appareil ?",
      answer:
        "On multiplie la puissance en watts par la durée d'utilisation en heures, puis on divise par 1 000 pour obtenir des kilowattheures (kWh). Le coût est ensuite égal aux kWh multipliés par le prix du kWh.",
    },
    {
      question: "Quel prix du kWh faut-il saisir ?",
      answer:
        "Celui de votre contrat, indiqué sur votre facture d'électricité. Il varie selon l'offre choisie et évolue dans le temps.",
    },
    {
      question: "Pourquoi le résultat peut-il différer de ma facture ?",
      answer:
        "Parce que la puissance réelle d'un appareil varie selon son fonctionnement (cycles de chauffe, thermostat), et que la veille consomme aussi un peu en continu.",
    },
  ],
  "consommation-carburant": [
    {
      question: "Comment calculer le coût d'un trajet en voiture ?",
      answer:
        "On multiplie la distance par la consommation aux 100 km et on divise par 100 pour obtenir les litres consommés. On multiplie ensuite ce volume par le prix du litre.",
    },
    {
      question: "Comment connaître la consommation réelle de mon véhicule ?",
      answer:
        "Consultez l'ordinateur de bord, ou faites un calcul de plein à plein : divisez les litres ajoutés au plein suivant par les kilomètres parcourus, puis multipliez par 100.",
    },
    {
      question: "Pourquoi ma consommation est-elle supérieure à celle du constructeur ?",
      answer:
        "Les valeurs annoncées sont mesurées en conditions normalisées. La vitesse, le trafic, le froid, la climatisation, la charge et le style de conduite augmentent la consommation réelle.",
    },
  ],
  "jours-entre-deux-dates": [
    {
      question: "Comment calculer le nombre de jours entre deux dates ?",
      answer:
        "On fait la différence entre les deux dates sur le calendrier. Pour un délai précis, vérifiez si la règle applicable inclut le jour de départ : si oui, ajoutez un jour au résultat.",
    },
    {
      question: "Les années bissextiles sont-elles prises en compte ?",
      answer:
        "Oui, le calcul s'appuie sur le calendrier réel, donc le 29 février des années bissextiles est bien compté.",
    },
    {
      question: "Comment compter uniquement les jours ouvrés ?",
      answer:
        "Ce calculateur compte tous les jours du calendrier. Pour exclure les week-ends et les jours fériés, utilisez notre calculateur de jours ouvrés entre deux dates.",
    },
  ],

  // Outils qui avaient déjà une question : on en ajoute.
  "calculateur-age": [
    {
      question: "Puis-je connaître le nombre total de jours vécus ?",
      answer:
        "Oui, en plus de l'âge en années, mois et jours, l'outil affiche le nombre total de jours écoulés depuis la date de naissance.",
    },
  ],
  "convertisseur-unites": [
    {
      question: "Comment convertir des degrés Fahrenheit en Celsius ?",
      answer:
        "On soustrait 32 aux degrés Fahrenheit, puis on multiplie le résultat par 5 et on divise par 9. Par exemple, 68 °F équivalent à 20 °C.",
    },
    {
      question: "Combien de kilomètres dans un mile ?",
      answer:
        "Un mile vaut environ 1,609 km. De même, une livre équivaut à environ 0,454 kg et un pouce à 2,54 cm.",
    },
  ],
  "compteur-mots": [
    {
      question: "Les espaces sont-ils comptés dans les caractères ?",
      answer:
        "L'outil affiche les deux totaux : le nombre de caractères avec espaces et le nombre de caractères sans espaces.",
    },
    {
      question: "Quelle longueur pour une publication ou une meta description ?",
      answer:
        "Une publication sur X est limitée à 280 caractères pour un compte standard. Une meta description de page web se situe en général autour de 150 à 160 caractères pour éviter d'être tronquée dans les résultats de recherche.",
    },
  ],
  "generateur-qr-code": [
    {
      question: "Que peut contenir un QR code ?",
      answer:
        "Un lien, un texte libre ou des coordonnées, selon ce que vous saisissez dans l'outil. Plus le contenu est long, plus le QR code est dense et difficile à scanner.",
    },
    {
      question: "Quelle taille minimale pour imprimer un QR code ?",
      answer:
        "Prévoyez au moins 2 cm de côté pour un scan de près, et plus grand si le code doit être lu à distance. Testez toujours le code avec un téléphone avant l'impression.",
    },
  ],
  "compresser-image": [
    {
      question: "Quel format d'image est le plus léger ?",
      answer:
        "À qualité visuelle équivalente, le format WEBP est généralement plus léger que le JPG et le PNG, ce qui en fait un bon choix pour le web.",
    },
    {
      question: "Mes images sont-elles envoyées sur un serveur ?",
      answer:
        "Non. La compression est réalisée dans votre navigateur : vos images restent sur votre appareil.",
    },
  ],
  "generateur-hashtags": [
    {
      question: "Les hashtags augmentent-ils vraiment la portée d'une publication ?",
      answer:
        "Ils aident à classer et à retrouver un contenu, mais ne garantissent pas sa visibilité : les plateformes tiennent compte de nombreux autres signaux, comme l'engagement et la pertinence du contenu.",
    },
  ],
};
