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
      <section className="relative py-32 md:py-40 flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white z-10" />
      </section>
    );
  }

  return (
    <section
      className="relative pt-32 pb-8 md:pt-40 md:pb-12 flex items-center justify-center overflow-hidden bg-white"
      suppressHydrationWarning
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-[1]" />

      {/* Floating images - behind the content */}
      <div className="absolute inset-0 z-[0] max-w-[1400px] mx-auto">
        {/* Left shape - hidden on tablet and below */}
        <motion.div
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute left-0 top-[60%] w-[450px] h-[300px] hidden md:block"
        >
          <Image
            src="/images/hero/shape-1.png"
            alt="Abstract shape"
            width={450}
            height={300}
            className="w-full h-full object-contain select-none pointer-events-none opacity-100"
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 450px"
          />
        </motion.div>

        {/* Right shape */}
        <motion.div
          animate={{
            rotate: [0, -10, 0, 10, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="absolute right-0 top-[60%] w-[450px] h-[300px] hidden md:block"
        >
          <Image
            src="/images/hero/shape-2.png"
            alt="Abstract shape"
            width={450}
            height={300}
            className="w-full h-full object-contain select-none pointer-events-none opacity-100"
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 450px"
          />
        </motion.div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-[2]">
        <div className="max-w-6xl mx-auto relative">
          {/* Central content */}
          <div className="text-center relative z-20 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#000F47] mb-6 font-display">
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
                  ? "o seu futuro com o inglês"
                  : "your future with English"}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-display">
                {t("hero.subtitle")}
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
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
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={`/${locale}/about`}
                  className="block w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 text-lg font-medium py-4 px-8 rounded-full border-2 border-gray-200 transition-all"
                >
                  {t("hero.secondary_cta")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
