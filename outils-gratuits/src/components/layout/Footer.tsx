import Link from "next/link";
import { SquareTerminal } from "lucide-react";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  const half = Math.ceil(categories.length / 2);

  return (
    <footer className="mt-24 border-t border-line bg-surface dark:border-line-dark dark:bg-surface-dark">
      <div className="container-page grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-ink text-signal dark:bg-brand-500 dark:text-white">
              <SquareTerminal size={17} />
            </span>
            Astucio
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted dark:text-muted-dark">
            {siteConfig.tagline} Plus de 50 outils gratuits, sans compte, utilisables directement
            dans votre navigateur.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">
            Catégories
          </h3>
          <ul className="space-y-2">
            {categories.slice(0, half).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="text-sm text-ink hover:text-brand-600 dark:text-ink-dark dark:hover:text-brand-300"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">
            &nbsp;
          </h3>
          <ul className="space-y-2">
            {categories.slice(half).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="text-sm text-ink hover:text-brand-600 dark:text-ink-dark dark:hover:text-brand-300"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted dark:text-muted-dark">
            À propos
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/a-propos" className="text-sm text-ink hover:text-brand-600 dark:text-ink-dark dark:hover:text-brand-300">
                À propos d&apos;Astucio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-ink hover:text-brand-600 dark:text-ink-dark dark:hover:text-brand-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="text-sm text-ink hover:text-brand-600 dark:text-ink-dark dark:hover:text-brand-300">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/conditions-utilisation" className="text-sm text-ink hover:text-brand-600 dark:text-ink-dark dark:hover:text-brand-300">
                Conditions d&apos;utilisation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-6 dark:border-line-dark">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row dark:text-muted-dark">
          <p>© {year} Astucio. Tous droits réservés.</p>
          <p>Fait avec soin en France 🇫🇷</p>
        </div>
      </div>
    </footer>
  );
}
