"use client";

import { Users, Globe, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface StatsProps {
  namespace?: string;
  transparent?: boolean;
}

const stats = [
  {
    icon: Users,
    value: "70+",
    labelKey: "stats.students",
    color: "text-blue-600",
  },
  {
    icon: Globe,
    value: "15+",
    labelKey: "stats.teachers",
    color: "text-green-600",
  },
  {
    icon: Award,
    value: "1+",
    labelKey: "stats.experience",
    color: "text-purple-600",
  },
];

// Skeleton
const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md animate-pulse"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 mb-6"></div>
          <div className="h-12 bg-gray-200 w-24 mb-3 rounded"></div>
          <div className="h-6 bg-gray-200 w-32 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function AnimatedStats({
  namespace = "HomePage",
  transparent = false,
}: StatsProps) {
  const t = useTranslations(namespace);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate a small delay to ensure a smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        transparent ? "" : "bg-white"
      }`}
    >
      {!transparent && (
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-blue-50" />
      )}
      <div className="container mx-auto px-4">
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <div
            className={`
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto
            `}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.labelKey}
                className={`${
                  transparent ? "bg-white/50 backdrop-blur-sm" : "bg-white"
                } p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-200 w-full max-w-md`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 ${stat.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <stat.icon className="w-10 h-10" />
                  </div>
                  <div className="text-5xl font-bold mb-3 text-gray-900">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-lg">{t(stat.labelKey)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
