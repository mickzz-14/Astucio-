# Astucio — Plateforme française d'outils gratuits

Site Next.js 14 (App Router) + TypeScript + Tailwind CSS conçu pour accueillir plus de 300 outils
gratuits en ligne, organisés en 15 catégories, avec un référencement SEO poussé (metadata, Open
Graph, Schema.org, sitemap, robots.txt) et une architecture pensée pour scaler facilement.

## Stack technique

- **Next.js 14** (App Router, RSC, `generateStaticParams` pour un rendu statique de chaque page)
- **TypeScript** strict
- **Tailwind CSS** avec design tokens personnalisés (mode clair/sombre via `next-themes`)
- **pdf-lib** (fusion de PDF côté navigateur), **qrcode** (génération de QR codes)
- Aucune base de données : tout le contenu (métadonnées SEO, FAQ, textes) vit dans
  `src/config/tools.ts`, ce qui rend le site 100 % statique et donc très rapide à héberger.

## Démarrage local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000.

```bash
npm run build   # build de production
npm run start   # démarre le serveur de production
npm run lint     # ESLint
npm run typecheck
```

## Déploiement sur Vercel

1. Poussez ce projet sur un dépôt Git (GitHub/GitLab/Bitbucket).
2. Sur [vercel.com](https://vercel.com), cliquez sur **New Project** et importez le dépôt.
3. Vercel détecte automatiquement Next.js — aucune configuration supplémentaire n'est nécessaire.
4. Ajoutez votre nom de domaine dans **Settings → Domains**, puis mettez à jour
   `siteConfig.url` dans `src/config/site.ts` avec ce domaine.
5. Une fois le site validé par Google AdSense, remplacez le contenu des composants
   `src/components/ui/AdSlot.tsx` par vos balises `<ins class="adsbygoogle">` et ajoutez le script
   AdSense dans `src/app/layout.tsx`.

## Architecture

```
src/
  app/                       # Routes (App Router)
    page.tsx                 # Page d'accueil
    [category]/page.tsx      # Page de catégorie (ex: /finance)
    [category]/[tool]/page.tsx  # Page d'un outil (ex: /finance/calculateur-credit)
    sitemap.ts                # Sitemap XML généré dynamiquement
    robots.ts                  # robots.txt généré dynamiquement
    manifest.ts                 # Manifeste PWA
    contact/ a-propos/ confidentialite/ conditions-utilisation/ favoris/
    not-found.tsx              # Page 404 personnalisée
  config/
    site.ts                   # Config globale (nom, description, url…)
    categories.ts             # Les 15 catégories
    tools.ts                  # Registre central de TOUS les outils (métadonnées + SEO + FAQ)
  components/
    layout/                   # Header, Footer, ThemeProvider, ThemeToggle
    ui/                       # Composants réutilisables (SearchBar, ToolCard, FAQSection, AdSlot…)
    tools/                    # Un composant par outil interactif (logique métier)
  lib/
    toolRegistry.tsx           # Mappe la clé "component" de tools.ts vers le vrai composant React
    utils.ts                   # Helpers (formatage nombres/devises, cn())
  context/
    FavoritesContext.tsx       # Favoris persistés en localStorage
```

### Comment ajouter un nouvel outil (pour atteindre les 300+)

1. **Créer le composant interactif** dans `src/components/tools/MonNouvelOutil.tsx` (export
   par défaut, sans props requises). Utilisez les classes utilitaires déjà définies
   (`.input`, `.btn-primary`, `.btn-secondary`, `.readout`, `.card`) pour rester cohérent avec le
   design du site.
2. **L'enregistrer** dans `src/lib/toolRegistry.tsx` :
   ```ts
   MonNouvelOutil: dynamic(() => import("@/components/tools/MonNouvelOutil")),
   ```
3. **Ajouter ses métadonnées** dans `src/config/tools.ts` (nouvel objet dans le tableau `tools`) :
   titre, description SEO, intro, FAQ, catégorie, mots-clés, `component: "MonNouvelOutil"`.
4. C'est tout : la page `/[categorie]/[slug]` est générée automatiquement, avec fil d'Ariane,
   Schema.org, Open Graph, FAQ, outils similaires et emplacements publicitaires réservés. Le
   sitemap et la page de catégorie se mettent aussi à jour automatiquement.

Comme chaque outil est importé dynamiquement (`next/dynamic`), le JavaScript d'un outil n'est
jamais chargé sur les autres pages : les performances restent optimales même à 300+ outils.

### Ajouter une nouvelle catégorie

Ajoutez une entrée dans `src/config/categories.ts` (slug, nom, description, icône
[lucide-react](https://lucide.dev/icons/)). Elle apparaît automatiquement dans le header, le
footer, la page d'accueil et génère sa propre page `/[slug]`.

## SEO

- Metadata (title/description), Open Graph et Twitter Card générés par page via `generateMetadata`.
- Schema.org : `WebSite` (accueil), `CollectionPage` (catégories), `SoftwareApplication` (outils),
  `BreadcrumbList` (fil d'Ariane), `FAQPage` (FAQ).
- Sitemap XML (`/sitemap.xml`) et `robots.txt` générés dynamiquement à partir du registre d'outils.
- URLs propres et stables : `/[categorie]/[outil]`.

## Accessibilité & performance

- Contrastes AA, focus visible au clavier, `prefers-reduced-motion` respecté.
- Composants d'outils chargés à la demande (code-splitting automatique).
- Images de démonstration compressées côté client, aucun appel serveur pour les outils PDF/images.

## Icônes PWA

Les fichiers `public/icon-192.png` et `public/icon-512.png` sont des icônes de démonstration.
Remplacez-les par le logo définitif avant la mise en production.
