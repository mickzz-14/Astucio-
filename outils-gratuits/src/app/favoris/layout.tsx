import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes favoris",
  description: "Retrouvez les outils que vous avez ajoutés à vos favoris sur cet appareil.",
  robots: { index: false, follow: true },
};

export default function FavorisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
