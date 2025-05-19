"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Globe2, Clock, Users, BookOpen, Monitor } from "lucide-react";

export default function FeaturesSection() {
  const t = useTranslations("HomePage.features");

  const features = [
    {
      icon: Globe2,
      title: t("cards.welcoming.title"),
      description: t("cards.welcoming.description"),
    },
    {
      icon: Clock,
      title: t("cards.learning.title"),
      description: t("cards.learning.description"),
    },
    {
      icon: Users,
      title: t("cards.experience.title"),
      description: t("cards.experience.description"),
    },
    {
      icon: BookOpen,
      title: t("cards.location.title"),
      description: t("cards.location.description"),
    },
    {
      icon: Monitor,
      title: t("cards.services.title"),
      description: t("cards.services.description"),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-sm"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
