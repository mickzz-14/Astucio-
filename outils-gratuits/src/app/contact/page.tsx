import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe d'Astucio pour une question, un signalement ou une suggestion d'outil.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page max-w-2xl py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Contact</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted dark:text-muted-dark">
        Une question, un bug à signaler, ou une idée d&apos;outil à ajouter ? Écrivez-nous, nous
        répondons personnellement à chaque message.
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-ink dark:text-ink-dark">
        <Mail size={15} className="text-muted dark:text-muted-dark" />
        <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-600 dark:hover:text-brand-300">
          {siteConfig.email}
        </a>
      </div>

      <div className="mt-8 card p-6">
        <ContactForm />
      </div>
    </div>
  );
}
