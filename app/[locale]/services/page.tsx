import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/cta-section";
import HandwrittenUnderline from "@/components/handwritten-underline";
import {
  MessageCircle,
  Book,
  Trophy,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
  Languages,
} from "lucide-react";
import GridPattern from "@/components/grid-pattern";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  return {
    title: `${t("title")} - StepUp`,
    description: t("subtitle"),
  };
}

const ServiceCard = async ({
  params,
  title,
  description,
  features,
  image,
  icon: Icon,
}: {
  params: Promise<{ locale: string }>;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: LucideIcon;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  return (
    <div className="group relative h-full">
      {/* Decorative background with animated gradient */}
      <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-0 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-700 animate-gradient-x bg-300%"></div>

      {/* Main card - ensuring rounded corners remain during animation */}
      <div className="relative h-full bg-gradient-to-br from-white via-white to-slate-50 rounded-3xl overflow-hidden border border-slate-200/50 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:[transform-style:preserve-3d] group-hover:[transform:perspective(1000px)_rotateY(5deg)]">
        {/* Corner glow effect */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>

        {/* Image with overlay */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />

          {/* Floating icon with animation */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg transform group-hover:translate-y-1 group-hover:scale-110 transition-all duration-500">
            <Icon className={`h-6 w-6`} />
          </div>
        </div>

        {/* Card content */}
        <div className="p-8 relative">
          {/* Decorative line */}
          <div
            className={`absolute top-0 left-8 right-8 h-0.5 opacity-10 transform origin-left group-hover:scale-x-100 scale-x-0 transition-transform duration-700`}
          ></div>

          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-black relative inline-block">
            {title}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </h3>

          <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3 group/item">
                <span className="text-primary mt-1 transform group-hover/item:scale-110 transition-transform">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="text-slate-700 group-hover/item:text-slate-900 transition-colors">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Ghost button that appears on hover */}
          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
            >
              <span>{t("cta.knowMore")}</span>
              <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  // Phrases to be highlighted in each language
  const highlightTextPT = "está no lugar certo";
  const highlightTextEN = "you're in the right place";

  // Full description text
  const descriptionText = t("description");

  // Determine which text to highlight based on the current language
  const highlightText = locale === "pt" ? highlightTextPT : highlightTextEN;

  return (
    <div className="relative min-h-screen">
      {/* Background with grid pattern and morphing effect */}
      <GridPattern />

      <div className="container mx-auto px-4 relative pt-32 pb-20">
        {/* Page header with animation */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-black bg-gradient-to-r from-primary to-secondary">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.5}
              color="#2b085c"
            />
          </h1>
          <p className="text-slate-700 text-xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Introduction section with image - more bold design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5 animate-fade-right animate-once">
            <div className="relative group">
              {/* Decorative background animated */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100 animate-gradient-x bg-300%"></div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/english-book.webp"
                  alt="Services of StepUp"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center animate-fade-left animate-once">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6 flex items-center text-slate-900">
                  <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3">
                    <Languages className="h-6 w-6" />
                  </span>
                  {t("title")}
                </h2>
                <div className="space-y-6">
                  <p className="text-2xl font-medium text-slate-800 leading-relaxed">
                    {t("subtitle")}
                  </p>
                  <p className="text-lg text-slate-600">
                    <HandwrittenUnderline
                      text={descriptionText}
                      highlightText={highlightText}
                      delay={0.5}
                      color="#2b085c"
                    />
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link
                      href="/contact"
                      className="group relative inline-flex items-center px-6 py-3 text-base font-medium text-black overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700">
                        <div className="w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12"></div>
                      </div>

                      <span className="relative z-10 flex items-center">
                        {t("cta.button")}
                        <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of Services with animations and innovative design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="animate-fade-up animate-delay-300">
            <ServiceCard
              params={params}
              title={t("tutoring.title")}
              description={t("tutoring.description")}
              features={[
                t("tutoring.features.recover"),
                t("tutoring.features.improve"),
                t("tutoring.features.develop"),
              ]}
              image="/images/services1.webp"
              icon={Book}
            />
          </div>
          <div className="animate-fade-up animate-delay-500">
            <ServiceCard
              params={params}
              title={t("exams.title")}
              description={t("exams.description")}
              features={[
                t("exams.features.school"),
                t("exams.features.certifications"),
                t("exams.features.specific"),
              ]}
              image="/images/services2.webp"
              icon={Trophy}
            />
          </div>
          <div className="animate-fade-up animate-delay-700">
            <ServiceCard
              params={params}
              title={t("activities.title")}
              description={t("activities.description")}
              features={[
                t("activities.features.clubs"),
                t("activities.features.workshops"),
                t("activities.features.events"),
              ]}
              image="/images/services3.webp"
              icon={MessageCircle}
            />
          </div>
        </div>

        <CTASection namespace="Services" />
      </div>
    </div>
  );
}
