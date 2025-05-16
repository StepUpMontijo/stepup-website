import GridPattern from "@/components/grid-pattern";
import HandwrittenUnderline from "@/components/handwritten-underline";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Award,
  MessageCircle,
  Clock,
} from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Courses.teenagers" });

  return {
    title: `${t("title")} - StepUp`,
    description: t("description"),
  };
}

export default async function TeenagersCoursePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Courses.teenagers" });

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Modern Design */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-white via-indigo-50 to-blue-50">
        <GridPattern />

        {/* Floating Elements */}
        <div className="absolute top-40 right-10 w-16 h-16 animate-bounce-slow hidden md:block">
          <Image
            src="/images/icons/star.svg"
            alt="Star icon"
            width={64}
            height={64}
            className="transform rotate-12"
          />
        </div>
        <div className="absolute top-60 left-16 w-20 h-20 animate-float-slow hidden md:block">
          <Image
            src="/images/icons/pencil.svg"
            alt="Pencil icon"
            width={80}
            height={80}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <span className="inline-block py-1 px-4 rounded-full bg-indigo-100 text-primary text-sm font-medium mb-4">
              {t("heroTitle")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-zinc-800 bg-gradient-to-r from-primary to-secondary">
              <HandwrittenUnderline
                text={t("mainTitle")}
                highlightText={t("mainTitle")}
                delay={0.5}
                color="#2b085c"
              />
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-10">
              {t("intro")}
            </p>
          </div>

          {/* Hero Image with Teenagers and English elements */}
          <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/courses/teenagers.webp"
              alt="Teenagers learning English"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <p className="text-2xl md:text-3xl font-bold mb-2">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pedagogical Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="prose prose-lg prose-purple mx-auto">
              <p className="text-xl text-center text-slate-700 mb-8">
                {t("approach")}
              </p>
            </div>

            {/* Activity Cards */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              <HandwrittenUnderline
                text={t("activities.title")}
                highlightText={t("activities.title")}
                delay={0.3}
                color="#2b085c"
              />
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full">
              {/* Interactive Classes */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {t("activities.interactive.title")}
                </h3>
                <p className="text-slate-600">
                  {t("activities.interactive.description")}
                </p>
              </div>

              {/* Exam Preparation */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {t("activities.exams.title")}
                </h3>
                <p className="text-slate-600">
                  {t("activities.exams.description")}
                </p>
              </div>

              {/* Communication Focus */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {t("activities.communication.title")}
                </h3>
                <p className="text-slate-600">
                  {t("activities.communication.description")}
                </p>
              </div>

              {/* Flexible Schedules */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {t("activities.schedule.title")}
                </h3>
                <p className="text-slate-600">
                  {t("activities.schedule.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Course */}
      <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
            <HandwrittenUnderline
              text={t("courses.title")}
              highlightText={t("courses.title")}
              delay={0.3}
              color="#2b085c"
            />
          </h2>

          <div className="max-w-4xl mx-auto">
            {/* Teens Course */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-64 relative">
                <Image
                  src="/images/courses/inner/teen.webp"
                  alt="Teens Course"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent flex items-end">
                  <h3 className="text-2xl font-bold text-white p-6">
                    {t("courses.teens.title")}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-6">
                  {t("courses.teens.description")}
                </p>
                <ul className="space-y-3">
                  {(t.raw("courses.teens.skills") as string[]).map(
                    (skill: string, index: number) => (
                      <li key={index} className="flex gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-700">{skill}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/60 p-12 md:p-16 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] text-center border border-white/40">
            <div className="mb-3">
              <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-sm font-semibold rounded-full mb-3 backdrop-blur-sm">
                {t("transformativeExperience")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-black mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-slate-700 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-black font-medium py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_25px_-10px_rgba(79,70,229,0.5)]"
            >
              {t("cta.button")}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                {t("noCommitment")}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" /> {t("response24h")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
