import HandwrittenUnderline from "@/components/handwritten-underline";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import {
  Gamepad2,
  Music,
  Puzzle,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Courses.children" });

  return {
    title: `${t("title")} - StepUp`,
    description: t("description"),
  };
}

export default async function ChildrenCoursePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Courses.children" });

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Playful Design */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-white via-purple-50/50 to-indigo-50/50">
        {/* Floating Elements */}
        <div className="absolute top-40 left-10 w-16 h-16 animate-bounce-slow opacity-60 hover:opacity-100 transition-opacity duration-300 hidden md:block">
          <Image
            src="/images/icons/pencil.svg"
            alt="Pencil icon"
            width={64}
            height={64}
            className="transform rotate-12 drop-shadow-lg"
          />
        </div>
        <div className="absolute top-60 right-16 w-20 h-20 animate-float-slow opacity-60 hover:opacity-100 transition-opacity duration-300 hidden md:block">
          <Image
            src="/images/icons/abc.svg"
            alt="ABC blocks"
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>
        <div className="absolute bottom-20 left-1/4 w-14 h-14 animate-spin-slow opacity-60 hover:opacity-100 transition-opacity duration-300 hidden md:block">
          <Image
            src="/images/icons/star.svg"
            alt="Star"
            width={56}
            height={56}
            className="drop-shadow-lg"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <span className="inline-block py-1.5 px-6 rounded-full bg-purple-100/80 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-purple-200/30 shadow-sm">
              {t("heroTitle")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-black bg-gradient-to-r from-primary via-purple-600 to-secondary">
              <HandwrittenUnderline
                text={t("mainTitle")}
                highlightText={t("mainTitle")}
                delay={0.5}
                color="#2b085c"
              />
            </h1>
            <p className="text-xl text-slate-700/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t("intro")}
            </p>
          </div>

          {/* Hero Image with Children and English elements */}
          <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="/images/courses/children.webp"
              alt="Children learning English"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end">
              <div className="p-8 md:p-12 w-full">
                <p className="text-2xl md:text-3xl font-bold mb-2 text-white group-hover:translate-y-[-4px] transition-all duration-300">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pedagogical Approach */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="prose prose-lg prose-purple mx-auto">
              <p className="text-xl text-center text-slate-700/90 mb-12 leading-relaxed">
                {t("approach")}
              </p>
            </div>

            {/* Activity Cards */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black bg-clip-text bg-gradient-to-r from-primary to-secondary">
              <HandwrittenUnderline
                text={t("activities.title")}
                highlightText={t("activities.title")}
                delay={0.3}
                color="#2b085c"
              />
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full">
              {/* Activity Cards - Updated styles */}
              <div className="group bg-gradient-to-br from-purple-50/50 to-indigo-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center border border-purple-100/20 backdrop-blur-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-primary rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Puzzle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {t("activities.playful.title")}
                </h3>
                <p className="text-slate-600/90">
                  {t("activities.playful.description")}
                </p>
              </div>

              {/* Music */}
              <div className="group bg-gradient-to-br from-purple-50/50 to-indigo-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center border border-purple-100/20 backdrop-blur-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-primary rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Music className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {t("activities.music.title")}
                </h3>
                <p className="text-slate-600/90">
                  {t("activities.music.description")}
                </p>
              </div>

              {/* Games */}
              <div className="group bg-gradient-to-br from-purple-50/50 to-indigo-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center border border-purple-100/20 backdrop-blur-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-primary rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {t("activities.games.title")}
                </h3>
                <p className="text-slate-600/90">
                  {t("activities.games.description")}
                </p>
              </div>

              {/* Stories */}
              <div className="group bg-gradient-to-br from-purple-50/50 to-indigo-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center border border-purple-100/20 backdrop-blur-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-primary rounded-xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {t("activities.stories.title")}
                </h3>
                <p className="text-slate-600/90">
                  {t("activities.stories.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Courses */}
      <section className="py-20 bg-gradient-to-b from-indigo-50/30 to-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black bg-clip-text bg-gradient-to-r from-primary to-secondary">
            <HandwrittenUnderline
              text={t("courses.title")}
              highlightText={t("courses.title")}
              delay={0.3}
              color="#2b085c"
            />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Pre-Kids Course */}
            <div className="group bg-white/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-purple-100/20">
              <div className="h-64 relative">
                <Image
                  src="/images/courses/inner/pre-kid.webp"
                  alt="Pre-Kids Course"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent group-hover:from-purple-900/80 transition-all duration-300 flex items-end">
                  <h3 className="text-2xl font-bold text-white/90 p-8 group-hover:text-white transition-colors duration-300">
                    {t("courses.preKids.title")}
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700/90 mb-8 leading-relaxed">
                  {t("courses.preKids.description")}
                </p>
                <ul className="space-y-4">
                  {(t.raw("courses.preKids.skills") as string[]).map(
                    (skill: string, index: number) => (
                      <li key={index} className="flex gap-3 group/item">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                        <span className="text-slate-700/90 group-hover/item:text-slate-900 transition-colors duration-300">{skill}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Kids Course */}
            <div className="group bg-white/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-purple-100/20">
              <div className="h-64 relative">
                <Image
                  src="/images/courses/inner/kid.webp"
                  alt="Kids Course"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent group-hover:from-purple-900/80 transition-all duration-300 flex items-end">
                  <h3 className="text-2xl font-bold text-white/90 p-8 group-hover:text-white transition-colors duration-300">
                    {t("courses.kids.title")}
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700/90 mb-8 leading-relaxed">
                  {t("courses.kids.description")}
                </p>
                <ul className="space-y-4">
                  {(t.raw("courses.kids.skills") as string[]).map(
                    (skill: string, index: number) => (
                      <li key={index} className="flex gap-3 group/item">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                        <span className="text-slate-700/90 group-hover/item:text-slate-900 transition-colors duration-300">{skill}</span>
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>
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
