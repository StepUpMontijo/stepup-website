"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import HandwrittenUnderline from "./handwritten-underline";

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const [locale, setLocale] = useState("pt");
  const [text, setText] = useState("");
  const fullText = "inglês";
  const isMounted = useIsMounted();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/en")) {
      setLocale("en");
    } else {
      setLocale("pt");
    }
  }, []);

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [text]);

  if (!isMounted) {
    return (
      <section className="relative h-screen max-w-screen-2xl mx-auto flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-white z-10" />
      </section>
    );
  }

  return (
    <section className="relative h-screen max-w-screen-2xl mx-auto flex items-center justify-center overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-white z-[1]" />

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-[800px] h-[800px] z-[2] hidden lg:block"
      >
        <div className="relative w-full h-full hidden xl:block translate-y-6">
          <Image
            src="/hero.webp"
            alt="Hero image"
            fill
            className="object-cover"
            priority
            loading="eager"
            sizes="(max-width: 1200px) 100vw, 800px"
          />
        </div>
      </motion.div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-[3]">
        <div className="max-w-4xl relative">
          {/* Central content */}
          <div className="relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl lg:text-7xl font-bold text-[#000F47] mb-6 font-display">
                <span className="relative inline-block">
                  <HandwrittenUnderline
                    text={locale === "pt" ? "Transforme" : "Transform"}
                    highlightText={locale === "pt" ? "Transforme" : "Transform"}
                    className="text-blue-600"
                    color="#1D4ED8"
                    delay={0.5}
                  />
                </span>{" "}
                {locale === "pt"
                  ? "o seu futuro com o inglês!"
                  : "your future with English!"}
              </h1>
              <p className="text-2xl text-gray-600 mb-12 max-w-3xl font-display">
                {t("hero.subtitle")}
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={`/${locale}/contact`}
                  className="block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  {t("hero.cta")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-[1]" />
    </section>
  );
}
