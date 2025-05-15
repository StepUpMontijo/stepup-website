import { getTranslations } from "next-intl/server";
import CourseCard from "./course-card";
import HandwrittenUnderline from "./handwritten-underline";

type PageProps = {
  locale: string;
};

export default async function CoursesSection({ locale }: PageProps) {
  const t = await getTranslations({ locale, namespace: "HomePage.courses" });

  // Course data
  const courses = [
    {
      key: "children",
      image: "/images/courses/children.webp",
      href: "/courses/children",
    },
    {
      key: "teenagers",
      image: "/images/courses/teenagers.webp",
      href: "/courses/teenagers",
    },
    {
      key: "adults",
      image: "/images/courses/adults.webp",
      href: "/courses/adults",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent"></div>

      {/* Decorative circles */}
      <div className="absolute -left-16 top-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.5}
              color="#2b085c"
            />
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            console.log("Course:", course);
            console.log("T:", t(`${course.key}.title`));
            return (
              <div
                key={course.key}
                className={`animate-fade-up animate-delay-${index + 1}00`}
              >
                <CourseCard
                  title={t(`${course.key}.title`)}
                  description={t(`${course.key}.description`)}
                  image={course.image}
                  href={course.href}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
