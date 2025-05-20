"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Navbar() {
  const t = useTranslations("NavBar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const coursesRef = useRef<HTMLDivElement>(null);
  const mounted = useIsMounted();
  const pathname = usePathname();
  const locale = useLocale();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 10 || window.pageYOffset > 10);
    };

    // Check scroll position immediately
    checkScroll();

    const handleScroll = () => {
      checkScroll();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        coursesRef.current &&
        !coursesRef.current.contains(event.target as Node)
      ) {
        setIsCoursesOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo_rounded.png"
              alt="Step Up Idiomas"
              width={250}
              height={75}
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-12">
              {/* <Link
                href={`/${locale}/about`}
                className={`text-base font-medium transition-colors hover:text-blue-600 ${
                  pathname.includes("/about")
                    ? "text-blue-600"
                    : isScrolled
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}
              >
                {t("about")}
              </Link> */}

              <Link
                href={`/${locale}/services`}
                className={`text-base font-medium transition-colors hover:text-blue-600 ${
                  pathname.includes("/services")
                    ? "text-blue-600"
                    : isScrolled
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}
              >
                {t("services")}
              </Link>

              {/* Courses Dropdown */}
              <div
                className="relative"
                ref={coursesRef}
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}
              >
                <button
                  className={`text-base font-medium transition-colors hover:text-blue-600 flex items-center gap-1 ${
                    pathname.includes("/courses") || isCoursesOpen
                      ? "text-blue-600"
                      : isScrolled
                      ? "text-gray-900"
                      : "text-gray-900"
                  }`}
                >
                  {t("courses")}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isCoursesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isCoursesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg py-2 border border-gray-100/50"
                    >
                      <Link
                        href={`/${locale}/courses/children`}
                        className="block px-4 py-2.5 text-gray-800 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-200"
                      >
                        {t("coursesDropdown.children")}
                      </Link>
                      <Link
                        href={`/${locale}/courses/teenagers`}
                        className="block px-4 py-2.5 text-gray-800 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-200"
                      >
                        {t("coursesDropdown.teenagers")}
                      </Link>
                      <Link
                        href={`/${locale}/courses/adults`}
                        className="block px-4 py-2.5 text-gray-800 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-200"
                      >
                        {t("coursesDropdown.adults")}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href={`/${locale}/contact`}
                className={`text-base font-medium transition-colors hover:text-blue-600 ${
                  pathname.includes("/contact")
                    ? "text-blue-600"
                    : isScrolled
                    ? "text-gray-900"
                    : "text-gray-900"
                }`}
              >
                {t("contact")}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/pt"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  locale === "pt" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                PT
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/en"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  locale === "en" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                EN
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
            >
              {t("cta")}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-gray-900 rounded-full transform-gpu"
                  style={{ top: "30%" }}
                  animate={
                    isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-gray-900 rounded-full transform-gpu"
                  style={{ top: "50%" }}
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-gray-900 rounded-full transform-gpu"
                  style={{ top: "70%" }}
                  animate={
                    isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[96px] bg-white/100 backdrop-blur-lg shadow-lg md:hidden z-[100]"
            >
              <div className="relative h-[calc(100vh-96px)] overflow-y-auto bg-white">
                <div className="px-6 py-8 space-y-8">
                  {/* Quick Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/${locale}/contact`}
                      className="flex-1 bg-blue-600 text-white text-center px-6 py-3.5 rounded-2xl font-medium hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("cta")}
                    </Link>
                  </div>

                  {/* Main Navigation */}
                  <div className="space-y-6">
                    {/* <Link
                      href={`/${locale}/about`}
                      className="flex items-center justify-between py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("about")}
                      <ChevronDown className="w-5 h-5 rotate-[-90deg] text-gray-400" />
                    </Link> */}

                    <Link
                      href={`/${locale}/services`}
                      className="flex items-center justify-between py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services")}
                      <ChevronDown className="w-5 h-5 rotate-[-90deg] text-gray-400" />
                    </Link>

                    {/* Courses Section */}
                    <div className="py-3 space-y-4 border-b border-gray-100">
                      <p className="text-lg font-medium text-gray-900">
                        {t("courses")}
                      </p>
                      <div className="space-y-3 pl-4">
                        <Link
                          href={`/${locale}/courses/children`}
                          className="block py-2 text-base text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t("coursesDropdown.children")}
                        </Link>
                        <Link
                          href={`/${locale}/courses/teenagers`}
                          className="block py-2 text-base text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t("coursesDropdown.teenagers")}
                        </Link>
                        <Link
                          href={`/${locale}/courses/adults`}
                          className="block py-2 text-base text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t("coursesDropdown.adults")}
                        </Link>
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/contact`}
                      className="flex items-center justify-between py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("contact")}
                      <ChevronDown className="w-5 h-5 rotate-[-90deg] text-gray-400" />
                    </Link>
                  </div>

                  {/* Language Switcher */}
                  <div className="pt-6">
                    <p className="text-sm font-medium text-gray-500 mb-4">
                      {locale === "pt" ? "Idioma" : "Language"}
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="/pt"
                        className={`flex-1 py-3 px-4 rounded-xl text-center font-medium transition-colors ${
                          locale === "pt"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Português
                      </Link>
                      <Link
                        href="/en"
                        className={`flex-1 py-3 px-4 rounded-xl text-center font-medium transition-colors ${
                          locale === "en"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        English
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
