import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FAQ_ITEMS } from "@/lib/landing-content";
import { SITE_URL } from "@/lib/site";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Typing Shadowing — Aprende inglés tipeando y escuchando (A1 a C2)",
    template: "%s | Typing Shadowing",
  },
  description:
    "Practica inglés gratis con typing shadowing: tipea textos adaptados a tu nivel MCER (A1, A2, B1, B2, C1, C2) y escucha la pronunciación de cada palabra en tiempo real. Sin registro.",
  keywords: [
    "practicar inglés tipeando",
    "typing shadowing",
    "aprender inglés mecanografía",
    "listening y typing english free",
    "practicar inglés A1 C2",
    "aprender inglés escuchando y escribiendo",
    "pronunciación inglés online",
    "shadowing inglés",
    "MCER A1 A2 B1 B2 C1 C2",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Typing Shadowing",
    title: "Typing Shadowing — Aprende inglés tipeando y escuchando",
    description:
      "Tipea textos por nivel (A1–C2) y escucha cada palabra. Mejora escritura, ortografía y comprensión auditiva. Gratis y sin registro.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Shadowing — Aprende inglés tipeando y escuchando",
    description:
      "Practica inglés con typing + shadowing por niveles A1 a C2. Gratis, sin registro.",
  },
  robots: { index: true, follow: true },
  category: "education",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#080a0e" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Typing Shadowing",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description:
        "Aplicación web gratuita para aprender inglés mediante typing y shadowing por niveles MCER A1 a C2.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      inLanguage: "es",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.es.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('ts-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
