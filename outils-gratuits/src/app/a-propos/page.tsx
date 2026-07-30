import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { tools } from "@/config/tools";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez la mission d'Astucio : rassembler plus de 300 outils gratuits en ligne, rapides et sans inscription, pour simplifier le quotidien.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "À propos" }]} />
      <h1 className="font-display text-3xl font-bold sm:text-4xl">À propos d&apos;{siteConfig.name}</h1>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted dark:text-muted-dark">
        <p>
          {siteConfig.name} est une plateforme française d&apos;outils gratuits en ligne. Notre objectif
          est simple : proposer plus de 300 outils couvrant la finance, les calculs, les conversions,
          les PDF, l&apos;immobilier, la santé et bien d&apos;autres domaines, réunis sur
          un site unique, rapide et sans publicité intrusive.
        </p>
        <p>
          Aujourd&apos;hui, le site compte {tools.length} outils actifs répartis sur {categories.length}{" "}
          catégories, et de nouveaux outils sont ajoutés régulièrement.
        </p>
        <h2 className="pt-4 font-display text-xl font-bold text-ink dark:text-ink-dark">
          Notre approche
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink dark:text-ink-dark">Gratuit et sans compte :</strong> chaque
            outil est utilisable immédiatement, sans inscription ni collecte de données inutile.
          </li>
          <li>
            <strong className="text-ink dark:text-ink-dark">Traitement local quand c&apos;est possible :</strong>{" "}
            la plupart des outils (PDF, images, mots de passe) traitent vos fichiers directement dans
            votre navigateur, sans passer par un serveur.
          </li>
          <li>
            <strong className="text-ink dark:text-ink-dark">Rapide :</strong> le site est conçu pour
            charger en un instant, sur mobile comme sur ordinateur.
          </li>
        </ul>
        <p className="pt-4">
          Une question, une suggestion d&apos;outil ou un problème à signaler ? Écrivez-nous depuis la
          page <a href="/contact" className="text-brand-600 underline dark:text-brand-300">Contact</a>.
        </p>
      </div>
    </div>
  );
}
