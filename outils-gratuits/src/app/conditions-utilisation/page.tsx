import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions générales d'utilisation des outils gratuits proposés sur Astucio.",
  alternates: { canonical: "/conditions-utilisation" },
};

export default function ConditionsPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Conditions d'utilisation" }]} />
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Conditions d&apos;utilisation</h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted dark:text-muted-dark">
        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            1. Objet
          </h2>
          <p>
            Les présentes conditions régissent l&apos;utilisation du site {siteConfig.name} ({siteConfig.url}),
            qui propose un ensemble d&apos;outils gratuits en ligne. En utilisant le site, vous acceptez
            ces conditions.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            2. Gratuité et disponibilité
          </h2>
          <p>
            L&apos;ensemble des outils proposés est accessible gratuitement, sans création de compte.
            Nous nous efforçons d&apos;assurer une disponibilité continue du service, sans garantie
            absolue d&apos;absence d&apos;interruption.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            3. Résultats fournis à titre indicatif
          </h2>
          <p>
            Les calculs, conversions et estimations fournis par les outils (financiers, de santé ou
            autres) le sont à titre purement informatif. Ils ne remplacent en aucun cas un conseil
            professionnel (bancaire, médical, juridique ou fiscal). {siteConfig.name} ne saurait être
            tenu responsable des décisions prises sur la seule base de ces résultats.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            4. Usage autorisé
          </h2>
          <p>
            Vous vous engagez à utiliser les outils du site de manière licite, sans tenter de nuire au
            bon fonctionnement du service (surcharge automatisée, tentative d&apos;intrusion, etc.).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            5. Propriété intellectuelle
          </h2>
          <p>
            Le nom, le logo, le design et le code du site {siteConfig.name} sont protégés. Toute
            reproduction non autorisée est interdite.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            6. Modification des conditions
          </h2>
          <p>
            Ces conditions peuvent être mises à jour à tout moment afin de refléter l&apos;évolution du
            site ou de la réglementation applicable.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-bold text-ink dark:text-ink-dark">
            7. Contact
          </h2>
          <p>Pour toute question relative à ces conditions, contactez-nous à {siteConfig.email}.</p>
        </section>
      </div>
    </div>
  );
}
