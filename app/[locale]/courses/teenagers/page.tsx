import GridPattern from "@/components/grid-pattern";
import HandwrittenUnderline from "@/components/handwritten-underline";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
    <div className="relative pt-32 pb-20 bg-gradient-to-b from-white to-slate-50">
      {/* Decorative background elements */}
      <GridPattern />

      <div className="container mx-auto px-4 relative">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-black bg-gradient-to-r from-primary to-secondary">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.5}
              color="#2b085c"
            />
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-purple-50 p-8 rounded-lg shadow-md">
          <p className="text-lg text-center text-gray-700">
            {t("underDevelopment")}
          </p>
        </div>
      </div>
    </div>
  );
}
