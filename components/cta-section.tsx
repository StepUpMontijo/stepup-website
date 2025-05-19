"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MessageCircle, Phone } from "lucide-react";
import HandwrittenUnderline from "@/components/handwritten-underline";
import { motion } from "framer-motion";
import Image from "next/image";

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100"
      >
        {/* Background Image - Mobile Only */}
        <motion.div
          className="absolute inset-0 z-0 lg:hidden"
          animate={{
            rotate: [0, -5, 0],
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Image
            src="/images/hero/shape-3.webp"
            alt="Decorative shapes"
            fill
            sizes="100vw"
            className="object-cover scale-[1.3]"
            priority
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Left Side */}
          <div className="relative w-full h-[200px] lg:w-[280px] lg:h-auto hidden lg:block">
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: [0, -5, 0],
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Image
                  src="/images/hero/shape-3.webp"
                  alt="Decorative shapes"
                  fill
                  className="object-cover scale-[1.3]"
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 p-6 lg:p-12 flex items-center">
            <div className="w-full flex flex-col items-center justify-between gap-6 lg:gap-8">
              {/* Text Content */}
              <div className="flex-1 text-center max-w-xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900"
                >
                  <HandwrittenUnderline
                    text={t("cta.title")}
                    highlightText={t("cta.title").split(" ").slice(-1)[0]}
                    delay={0.5}
                    color="#2b085c"
                  />
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-base sm:text-lg text-slate-700"
                >
                  {t("cta.subtitle")}
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-600/90 hover:to-indigo-800/90 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center whitespace-nowrap flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t("cta.button")}
                </Link>
                <a
                  href="tel:+351923076858"
                  className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-medium transition-colors text-center flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  {t("cta.call")}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
