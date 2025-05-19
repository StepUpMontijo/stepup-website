"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function HeroCta() {
  const t = useTranslations("HomePage.heroCta");
  const locale = useLocale();

  return (
    <section className="relative z-[2]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden relative"
        >
          {/* Background Image - Mobile Only */}
          <motion.div 
            className="absolute inset-0 z-0 max-[1088px]:block hidden"
            animate={{ 
              rotate: [0, -5, 0],
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
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

          {/* Left Side Image - Desktop Only */}
          <div className="absolute bottom-0 left-0 w-[280px] h-full hidden min-[1088px]:block opacity-80">
            <motion.div
              className="absolute inset-0"
              animate={{ 
                rotate: [0, -5, 0],
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Image
                src="/images/hero/shape-3.webp"
                alt="Decorative shapes"
                fill
                className="object-cover scale-[1.3]"
                sizes="100vw"
                priority
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-1 p-6 min-[1088px]:p-12">
            <div className="flex flex-col items-center justify-between gap-6 max-w-2xl mx-auto min-[1088px]:max-w-none min-[1088px]:flex-row min-[1088px]:gap-8 min-[1088px]:ml-[280px]">
              {/* Text Content */}
              <div className="flex-1 text-center min-[1088px]:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-2xl sm:text-3xl min-[1088px]:text-4xl font-bold text-gray-900 mb-3"
                >
                  {t("title")}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto min-[1088px]:mx-0"
                >
                  {t("subtitle")}
                </motion.p>
              </div>

              {/* Vertical Line & CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <div className="hidden min-[1088px]:block w-px h-12 bg-gray-200 mr-8" />
                <Link
                  href={`/${locale}/contact`}
                  className="w-full sm:w-auto inline-flex px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] justify-center"
                >
                  {t("cta")}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 