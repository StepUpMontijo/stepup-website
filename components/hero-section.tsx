"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import InteractiveGlobe, { DecorativeIcons } from "./interactive-globe";
import { useIsMounted } from "@/hooks/useIsMounted";

// Component for the typewriter effect with vertical cursor style
const TypewriterEffect = ({
  words,
  baseTextFirst,
  baseTextSecond,
}: {
  words: string[];
  baseTextFirst: string;
  baseTextSecond: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80); // Mais rápido inicialmente

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Palavra atual
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        // Deletando caracteres
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(30); // Deletar ainda mais rápido

        // Quando terminar de deletar, mude para o próximo palavra
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(80);
        }
      } else {
        // Digitando caracteres
        setCurrentText((prev) => currentWord.substring(0, prev.length + 1));
        setTypingSpeed(60); // Digitar mais rápido

        // Quando terminar de digitar, aguarde e então comece a deletar
        if (currentText === currentWord) {
          setTypingSpeed(1000); // Pausa mais curta
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Main container - layout adaptable for all sizes */}
      <div className="flex flex-col text-center w-full">
        {/* Container with dynamic height to avoid jumps */}
        <div className="relative min-h-[3em] md:min-h-[1.5em] flex flex-col items-center justify-center mb-1 md:mb-2">
          {/* Layout adaptable for all screen sizes */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span className="text-white font-bold text-shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {baseTextFirst}
            </span>

            <div className="inline-flex items-center relative">
              <motion.span
                className="font-bold text-[#00a2ff] text-shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {currentText}
              </motion.span>
              {/* Vertical blinking cursor that follows the text */}
              <span className="inline-block h-full w-[2px] md:w-[3px] bg-[#00a2ff] animate-blink ml-[1px]"></span>
            </div>
          </div>
        </div>

        {/* Second line adaptable */}
        <div className="text-white font-bold text-shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] min-h-[1.2em] text-center -mt-1 md:mt-0">
          {baseTextSecond}
        </div>
      </div>

      {/* Specific styles for different screen sizes */}
      <style jsx global>{`
        /* Specific styles for tablets */
        @media (min-width: 640px) and (max-width: 1023px) {
          .text-[#00a2ff] {
            max-width: 100%;
            font-size: 0.95em;
            word-break: break-word;
          }
        }
      `}</style>
    </div>
  );
};

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const [locale, setLocale] = useState("pt");
  const isMounted = useIsMounted();

  // Detect the current locale
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/en")) {
      setLocale("en");
    } else {
      setLocale("pt");
    }
  }, []);

  // Words for the typewriter effect with correct articles - expanded list
  const typingWords = {
    pt: [
      "a sua carreira",
      "o seu potencial",
      "o seu futuro",
      "novas oportunidades",
      "o mundo",
      "a sua confiança",
      "novos horizontes",
      "o seu networking",
      "a sua comunicação",
      "o seu currículo",
      "a sua mente",
    ],
    en: [
      "your career",
      "your potential",
      "your future",
      "new opportunities",
      "the world",
      "your confidence",
      "new horizons",
      "your networking",
      "your communication",
      "your resume",
      "your mind",
    ],
  };

  // Base text in two lines - with verb that works with all options
  const baseTextFirst = {
    pt: "Desbloqueie",
    en: "Unlock",
  };

  const baseTextSecond = {
    pt: "com o inglês",
    en: "with English",
  };

  // Simplified version for SSR
  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/60 z-10" />
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50 to-white"
      suppressHydrationWarning
    >
      {/* More transparent gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/80 z-10" />

      {/* Interactive Globe - only desktop */}
      <div className="absolute inset-0 z-20 hidden lg:block">
        <InteractiveGlobe />
      </div>

      {/* Decorative Icons - only mobile/tablet */}
      <div className="absolute inset-0 z-20 lg:hidden">
        <DecorativeIcons />
      </div>

      {/* Hero content - centered */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center w-full max-w-[80%] px-4 sm:px-6 md:px-8">
          {/* Main title - text with shadow for readability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8 w-full flex justify-center items-center"
          >
            <h1 className="text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] w-full">
              <TypewriterEffect
                words={typingWords[locale as "pt" | "en"]}
                baseTextFirst={baseTextFirst[locale as "pt" | "en"]}
                baseTextSecond={baseTextSecond[locale as "pt" | "en"]}
              />
            </h1>
          </motion.div>

          {/* Subtitle with smooth background for readability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-lg shadow-md inline-block mb-6 md:mb-8 mx-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium select-none text-[#2b085c]">
              {t("hero.subtitle")}
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="pointer-events-auto relative group"
            >
              {/* Animated rainbow border as a line circling the button - even thicker */}
              <span className="absolute -inset-[5px] rounded-xl z-0 overflow-hidden">
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #ef4444, #facc15, #3b82f6, #a855f7, #ef4444)",
                    animation: "spin 4s linear infinite",
                    width: "200%",
                    height: "200%",
                    top: "-50%",
                    left: "-50%",
                  }}
                />
                <style jsx global>{`
                  @keyframes spin {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </span>
              <span className="absolute -inset-[3px] bg-white rounded-[12px] z-[1]"></span>

              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-500 hover:to-indigo-700 text-white py-3 px-6 sm:px-8 rounded-[8px] font-medium shadow-md z-[2] text-sm sm:text-base"
                aria-label={t("hero.cta")}
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-white rounded-[8px] opacity-0 group-hover:opacity-10"></span>
                <span className="relative flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <span>{t("hero.cta")}</span>
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="pointer-events-auto"
            >
              <Link
                href="/about"
                className="relative inline-flex items-center justify-center overflow-hidden bg-white border border-gray-200 hover:border-blue-300 text-indigo-800 py-3 px-6 sm:px-8 rounded-xl font-medium shadow-md group text-sm sm:text-base"
                aria-label={t("about.cta")}
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-blue-100 rounded-xl opacity-0 group-hover:opacity-20"></span>
                <span className="relative flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{t("about.cta")}</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
