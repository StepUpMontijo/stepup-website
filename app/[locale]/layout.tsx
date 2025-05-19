import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import StructuredData from "../structured-data";
import ClientLayout from "./client-layout";

import "../globals.css";

// Default timezone configuration
const timeZone = "Europe/Lisbon";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
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
  return [{ locale: "en" }, { locale: "pt" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <>
      <StructuredData locale={locale} />
      <ClientLayout
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        {children}
      </ClientLayout>
    </>
  );
}
