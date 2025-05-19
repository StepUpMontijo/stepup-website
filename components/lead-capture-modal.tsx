import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
}: LeadCaptureModalProps) {
  const t = useTranslations("LeadCapture");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close button wrapper - always on top */}
            <div className="absolute top-0 right-0 p-2 z-50">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <X className="w-6 h-6 text-slate-500 group-hover:text-slate-700" />
              </button>
            </div>

            {/* Decorative background image with animation */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 1.2,
                rotate: -5,
                x: "-25%",
                y: "25%",
              }}
              animate={{
                opacity: 0.4,
                scale: 1.3,
                rotate: 5,
                x: "-20%",
                y: "20%",
              }}
              transition={{
                opacity: { duration: 1 },
                scale: {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                x: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                y: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              className="absolute -bottom-1/2 -left-1/2 w-[150%] h-[150%] origin-bottom-left pointer-events-none"
            >
              <Image
                src="/images/hero/shape-3.webp"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="relative p-8 md:p-12 z-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,#2563eb_25%,#1d4ed8_50%,#2563eb_75%)] [-webkit-text-fill-color:transparent] [text-shadow:0_2px_20px_rgba(37,99,235,0.2)]">
                      {t("title")}
                    </span>
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-slate-600 max-w-md mx-auto mb-6"
                >
                  {t("subtitle")}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <ul className="text-left space-y-3 mb-8">
                    <li className="flex items-center text-slate-700">
                      <span className="mr-2">✨</span>
                      {t("features.free")}
                    </li>
                    <li className="flex items-center text-slate-700">
                      <span className="mr-2">⏰</span>
                      {t("features.schedule")}
                    </li>
                    <li className="flex items-center text-slate-700">
                      <span className="mr-2">🎯</span>
                      {t("features.methodology")}
                    </li>
                  </ul>

                  <Link
                    href={`/${locale}/contact`}
                    onClick={onClose}
                    className="inline-block w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden bg-primary text-black hover:text-white shadow-lg hover:shadow-xl group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      {t("cta")}
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-slate-500 text-center mt-6"
                >
                  {t("footer")}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
