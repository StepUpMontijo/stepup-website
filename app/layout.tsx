import type { Metadata } from "next";
import "./globals.css";
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stepupidiomas.pt"),
  title: {
    default: "StepUp | Cursos de Inglês para todas as idades",
    template: "%s",
  },
  description:
    "A StepUp é uma escola de inglês que combina inovação com experiência. Adaptamos nossos cursos para diferentes idades e níveis.",
  keywords: [
    "escola inglês montijo",
    "curso inglês",
    "aprender inglês",
    "aulas inglês",
    "inglês para crianças",
    "inglês para adultos",
    "curso de idiomas",
    "stepup",
    "escola de idiomas",
    "inglês certificado",
    "aulas particulares inglês",
    "inglês empresarial",
    "inglês conversação",
    "inglês exames cambridge",
    "inglês para adolescentes",
    "inglês intensivo",
    "inglês online",
    "inglês presencial",
    "escola inglês setúbal",
    "melhor escola inglês",
  ],
  authors: [{ name: "StepUp" }],
  creator: "StepUp",
  publisher: "StepUp",
  category: "education",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    alternateLocale: "en_US",
    title: "StepUp | Cursos de Inglês para todas as idades",
    description:
      "A StepUp é uma escola de inglês que combina inovação com experiência. Adaptamos nossos cursos para diferentes idades e níveis.",
    url: "https://stepupidiomas.pt",
    siteName: "StepUp Idiomas",
    images: [
      {
        url: "/images/og_image.png",
        width: 1200,
        height: 630,
        alt: "StepUp - Cursos de Inglês para todas as idades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StepUp | Cursos de Inglês para todas as idades",
    description:
      "A StepUp é uma escola de inglês que combina inovação com experiência. Adaptamos nossos cursos para diferentes idades e níveis.",
    images: ["/images/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // verification: {
  //   google: "google-verification-code-here",
  // },
  alternates: {
    canonical: "https://stepupidiomas.pt",
    languages: {
      pt: "https://stepupidiomas.pt/pt",
      en: "https://stepupidiomas.pt/en",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "StepUp",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${publicSans.variable} font-sans`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
