import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité d'Astucio : données collectées, cookies, publicité et vos droits.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Confidentialité" }]} />
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Politique de confidentialité</h1>
      <p className="mt-2 text-xs text-muted dark:text-muted-dark">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted dark:text-muted-dark">
        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            1. Traitement de vos fichiers
          </h2>
          <p>
            La majorité des outils proposés sur {siteConfig.name} (fusion de PDF, compression et
            conversion d&apos;images, génération de mots de passe, etc.) traitent vos fichiers et vos
            données directement dans votre navigateur, à l&apos;aide de JavaScript. Ces fichiers ne
            sont ni envoyés, ni stockés sur nos serveurs.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            2. Favoris et préférences
          </h2>
          <p>
            La liste de vos outils favoris et votre préférence de thème (clair/sombre) sont enregistrées
            localement dans le stockage de votre navigateur (localStorage). Ces informations ne sont
            jamais transmises à nos serveurs et restent propres à votre appareil.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            3. Cookies et mesure d&apos;audience
          </h2>
          <p>
            {siteConfig.name} peut utiliser des cookies techniques nécessaires au fonctionnement du
            site, ainsi que des outils de mesure d&apos;audience anonymisés afin de comprendre
            l&apos;usage du site et d&apos;améliorer nos outils.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            4. Publicité
          </h2>
          <p>
            Le site prévoit d&apos;afficher des espaces publicitaires, notamment via Google AdSense.
            Ces régies publicitaires peuvent utiliser des cookies afin de proposer des annonces
            pertinentes. Vous pouvez gérer vos préférences publicitaires directement depuis les
            paramètres proposés par Google à l&apos;adresse{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline dark:text-brand-300"
            >
              adssettings.google.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            5. Vos droits
          </h2>
          <p>
            Conformément au Règlement général sur la protection des données (RGPD), vous disposez d&apos;un
            droit d&apos;accès, de rectification et de suppression des données personnelles que vous
            nous auriez transmises (par exemple via le formulaire de contact). Pour exercer ce droit,
            contactez-nous à l&apos;adresse {siteConfig.email}.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            6. Contact
          </h2>
          <p>
            Pour toute question relative à cette politique de confidentialité, écrivez-nous à{" "}
            {siteConfig.email}.
          </p>
        </section>
      </div>
    </div>
  );
}
