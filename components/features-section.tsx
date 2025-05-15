"use client";

import { Heart, Sparkles, Star, MapPin, BookOpen, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";
import HandwrittenUnderline from "@/components/handwritten-underline";
import { useAnimatedMount } from "@/hooks/useIsMounted";

// Definition of icons for each card
const featureIcons = {
  welcoming: Heart,
  learning: Sparkles,
  experience: Star,
  location: MapPin,
  methodology: BookOpen,
  services: Coffee,
};

// List of keys for the cards
const featureKeys = [
  "welcoming",
  "learning",
  "experience",
  "location",
  "services",
];

export default function FeaturesSection() {
  // Get translations
  const t = useTranslations("HomePage.features");

  // Use the custom hook for animations
  const { isMounted, isVisible } = useAnimatedMount();

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-blue-50" />
      <div className="container mx-auto px-4">
        <div
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.8}
              color="#3b82f6"
            />
          </h2>
          <p className="text-xl text-gray-600">{t("subtitle")}</p>
        </div>

        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex flex-wrap justify-center gap-8">
            {featureKeys.map((key) => {
              const Icon = featureIcons[key as keyof typeof featureIcons];
              return (
                <div
                  key={key}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-200 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {t(`cards.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {t(`cards.${key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
