"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MessageCircle, Phone } from "lucide-react";
import HandwrittenUnderline from "@/components/handwritten-underline";

interface CTASectionProps {
  namespace?: string;
  className?: string;
}

export default function CTASection({
  namespace = "Common",
  className = "",
}: CTASectionProps) {
  const t = useTranslations(namespace);

  return (
    <div className={`relative ${className}`}>
      <div className="relative bg-white rounded-3xl p-12 shadow-lg border border-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              <HandwrittenUnderline
                text={t("cta.title")}
                highlightText={t("cta.title")}
                delay={0.5}
                color="#2b085c"
              />
            </h2>
            <p className="text-slate-700 text-lg max-w-lg">
              {t("cta.subtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-600/90 hover:to-indigo-800/90 text-white py-4 px-8 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center whitespace-nowrap flex items-center justify-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {t("cta.button")}
            </Link>
            <a
              href="tel:+351923076858"
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 py-4 px-8 rounded-xl font-medium transition-colors text-center flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
            >
              <Phone className="h-5 w-5 text-primary" />
              {t("cta.call")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
