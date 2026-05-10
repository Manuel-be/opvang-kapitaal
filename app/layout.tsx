import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Opvang Kapitaal — Investeer in kinderopvang in Oost-Vlaanderen",
  description: "Opvang Kapitaal zoekt investeerders voor een nieuwe crèche (0–3 jaar) in Oost-Vlaanderen. Stabiel rendement, groeiende markt, maatschappelijke impact. Instap vanaf €80.000.",
  openGraph: {
    title: "Opvang Kapitaal — Investeer in kinderopvang",
    description: "Stabiel rendement in een gesubsidieerde sector met structureel tekort. Instap vanaf €80.000.",
    locale: "nl_BE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
