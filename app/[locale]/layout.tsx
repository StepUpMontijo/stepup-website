import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { locales } from "@/i18n";
import StructuredData from "../structured-data";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Define the titles and descriptions based on the locale
  const { locale } = await Promise.resolve(params);

  // Specific metadata by language
  const localizedMetadata: Record<
    string,
    { title: string; description: string }
  > = {
    pt: {
      title: "StepUp | Cursos de Inglês para todas as idades",
      description:
        "A StepUp é uma escola de inglês que combina inovação com experiência. Adaptamos nossos cursos para diferentes idades e níveis.",
    },
    en: {
      title: "StepUp | English Courses for all ages",
      description:
        "StepUp is an English language school that combines innovation with experience. We adapt our courses for different ages and levels.",
    },
  };

  // Uses the current locale or defaults to Portuguese if not available
  const metadataForLocale = localizedMetadata[locale] || localizedMetadata.pt;

  // Build URLs for alternates
  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    alternateLanguages[loc] = `https://stepupidiomas.pt/${loc}`;
  }

  return {
    title: metadataForLocale.title,
    description: metadataForLocale.description,
    alternates: {
      canonical: `https://stepupidiomas.pt/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: metadataForLocale.title,
      description: metadataForLocale.description,
      locale: locale === "pt" ? "pt_PT" : "en_US",
      url: `https://stepupidiomas.pt/${locale}`,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  if (!locales.includes(locale)) return notFound();
  await setRequestLocale(locale);

  // Load the messages for the current locale
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    messages = {};
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div
        className={`flex flex-col min-h-screen bg-white text-gray-900 ${inter.className}`}
      >
        <StructuredData locale={locale} />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster closeButton richColors />
      </div>
    </NextIntlClientProvider>
  );
}
