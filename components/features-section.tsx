"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Globe2, Clock, Users, BookOpen, Monitor, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const t = useTranslations("HomePage.features");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const features: Feature[] = [
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow min-h-[250px] flex flex-col"
              style={{
                opacity: isLoading ? 0 : 1,
                transform: isLoading ? "translateY(20px)" : "translateY(0)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div 
                className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 shrink-0"
                aria-hidden="true"
              >
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
