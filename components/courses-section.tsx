"use client";
import CourseCard from "./course-card";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CoursesSection() {
  const t = useTranslations("HomePage.courses");

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Courses grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div key={course.key} variants={itemVariants}>
              <CourseCard
                title={t(`${course.key}.title`)}
                description={t(`${course.key}.description`)}
                image={course.image}
                href={course.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
