"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Navbar() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mounted = useIsMounted();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  // Check if the component is mounted to avoid hydration issues
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageMenuOpen && !target.closest("[data-language-menu]")) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLanguageMenuOpen]);

  if (!mounted) return null;

  // Check if the link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === `/${locale}` || pathname === "/";
    }
    return pathname?.startsWith(`/${locale}${path}`);
  };

  const navbarClass = isScrolled
    ? "bg-white shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-white/90"
    : "bg-white/5 backdrop-blur-sm supports-[backdrop-filter]:bg-white/10";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${navbarClass}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/logo.png"
                alt="StepUp"
                width={48}
                height={48}
                className="h-8 w-auto transition-transform group-hover:brightness-110"
              />
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
              StepUp
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", label: "NavBar.home" },
              { href: "/about", label: "NavBar.about" },
              { href: "/services", label: "NavBar.services" },
              { href: "/contact", label: "NavBar.contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {t(item.label)}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 mx-2"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Dropdown menu for courses */}
            <div className="relative group" data-language-menu>
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive("/courses")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {t("NavBar.courses")}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-56 rounded-xl shadow-lg py-2 bg-white border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-2 group-hover:translate-y-0">
                {[
                  { href: "/courses/children", label: "CourseTypes.children" },
                  {
                    href: "/courses/teenagers",
                    label: "CourseTypes.teenagers",
                  },
                  { href: "/courses/adults", label: "CourseTypes.adults" },
                ].map((course) => (
                  <Link
                    key={course.href}
                    href={`/${locale}${course.href}`}
                    className={`block px-4 py-2 text-sm ${
                      isActive(course.href)
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {t(course.label)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Language selector and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language selector */}
            <div className="relative" data-language-menu>
              <button
                className="flex items-center gap-2 text-gray-700 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                aria-label="Language selector"
                aria-expanded={isLanguageMenuOpen}
                aria-controls="language-menu"
              >
                {locale === "pt" ? (
                  <Image
                    src="/images/flags/pt.svg"
                    alt="PT Flag"
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                ) : (
                  <Image
                    src="/images/flags/en.svg"
                    alt="USA Flag"
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                )}
                <span className="font-medium">
                  {locale === "pt" ? "PT" : "EN"}
                </span>
              </button>
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-1 w-48 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 py-1 z-10"
                  id="language-menu"
                  role="menu"
                >
                  {[
                    {
                      locale: "pt",
                      label: "Language.pt",
                      flag: "/images/flags/pt.svg",
                      alt: "PT Flag",
                    },
                    {
                      locale: "en",
                      label: "Language.en",
                      flag: "/images/flags/en.svg",
                      alt: "USA Flag",
                    },
                  ].map((lang) => (
                    <Link
                      key={lang.locale}
                      href={`/${lang.locale}${
                        pathname?.replace(/^\/[a-z]{2}/, "") ?? "/"
                      }`}
                      className={`flex items-center px-4 py-2 text-sm ${
                        locale === lang.locale
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsLanguageMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <Image
                          src={lang.flag}
                          alt={lang.alt}
                          width={18}
                          height={14}
                          className="rounded-sm mr-2"
                        />
                        {locale === lang.locale && (
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        )}
                      </div>
                      {t(lang.label)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* CTA button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/${locale}/contact`}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 px-5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                {t("HomePage.hero.cta")}
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile language selector */}
            <Link
              href={`/${locale === "pt" ? "en" : "pt"}${
                pathname?.replace(/^\/[a-z]{2}/, "") ?? "/"
              }`}
              className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {locale === "pt" ? (
                <Image
                  src="/images/flags/en.svg"
                  alt="USA Flag"
                  width={16}
                  height={12}
                  className="rounded-sm"
                />
              ) : (
                <Image
                  src="/images/flags/pt.svg"
                  alt="PT Flag"
                  width={16}
                  height={12}
                  className="rounded-sm"
                />
              )}
              <span className="text-sm font-medium">
                {locale === "pt" ? "EN" : "PT"}
              </span>
            </Link>

            {/* Menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                isMenuOpen ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          id="mobile-menu"
          role="menu"
        >
          <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
            {[
              { href: "/", label: "NavBar.home" },
              { href: "/about", label: "NavBar.about" },
              { href: "/services", label: "NavBar.services" },
              { href: "/contact", label: "NavBar.contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`py-3 px-3 rounded-lg flex items-center ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {isActive(item.href) && (
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                )}
                {t(item.label)}
              </Link>
            ))}

            {/* Courses submenu for mobile */}
            <div className="py-2 px-3 space-y-1">
              <div
                className={`font-medium py-2 ${
                  isActive("/courses") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {isActive("/courses") && (
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 inline-block"></span>
                )}
                {t("NavBar.courses")}
              </div>
              <div className="ml-4 mt-2 space-y-3 border-l-2 border-gray-100 pl-3">
                {[
                  { href: "/courses/children", label: "CourseTypes.children" },
                  {
                    href: "/courses/teenagers",
                    label: "CourseTypes.teenagers",
                  },
                  { href: "/courses/adults", label: "CourseTypes.adults" },
                ].map((course) => (
                  <Link
                    key={course.href}
                    href={`/${locale}${course.href}`}
                    className={`block py-1 ${
                      isActive(course.href)
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isActive(course.href) && (
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 inline-block"></span>
                    )}
                    {t(course.label)}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA button for mobile */}
            <div className="pt-3 mt-2">
              <Link
                href={`/${locale}/contact`}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium shadow-md text-center block"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("HomePage.hero.cta")}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
