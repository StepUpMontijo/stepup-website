import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimatedStats from "@/components/animated-stats";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import SchoolImages from "@/components/school-images";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import BiginForm from "@/components/bigin-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: `${t("hero.title")}`,
    description: t("hero.subtitle"),
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="relative bg-white">
      <HeroSection />
      <AnimatedStats />
      <FeaturesSection />
      <SchoolImages />
      <TestimonialsCarousel />
      <BiginForm
        className="max-w-3xl mx-auto mb-5"
        title={
          locale === "en"
            ? "Schedule a trial lesson!"
            : "Dê o primeiro passo na sua jornada"
        }
        subtitle={
          locale === "en"
            ? "Book your free English class today!"
            : "Experimente uma aula gratuita sem compromisso"
        }
      />
    </div>
  );
}
