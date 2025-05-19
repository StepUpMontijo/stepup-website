"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  Home,
  Info,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [currentMinute, setCurrentMinute] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Define the current day and time
    const now = new Date();
    const today = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();

    setCurrentDay(today);
    setCurrentHour(hour);
    setCurrentMinute(minute);

    // Check if the school is open based on the day and time
    const currentTime = hour * 60 + minute; // Convert to minutes since midnight

    // Monday: 18:30-21:30
    if (
      today === 1 &&
      currentTime >= 18 * 60 + 30 &&
      currentTime < 21 * 60 + 30
    ) {
      setIsOpen(true);
      return;
    }

    // Tuesday: 08:30-10:00 or 18:30-21:30
    if (
      today === 2 &&
      ((currentTime >= 8 * 60 + 30 && currentTime < 10 * 60) ||
        (currentTime >= 18 * 60 + 30 && currentTime < 21 * 60 + 30))
    ) {
      setIsOpen(true);
      return;
    }

    // Wednesday: 08:30-10:00 or 18:00-20:00
    if (
      today === 3 &&
      ((currentTime >= 8 * 60 + 30 && currentTime < 10 * 60) ||
        (currentTime >= 18 * 60 && currentTime < 20 * 60))
    ) {
      setIsOpen(true);
      return;
    }

    // Other days or times: closed
    setIsOpen(false);

    // Update every minute
    const timer = setInterval(() => {
      const updatedNow = new Date();
      const updatedHour = updatedNow.getHours();
      const updatedMinute = updatedNow.getMinutes();

      setCurrentHour(updatedHour);
      setCurrentMinute(updatedMinute);

      // Recalculate if it is open
      const updatedTime = updatedHour * 60 + updatedMinute;

      // Monday: 18:30-21:30
      if (
        today === 1 &&
        updatedTime >= 18 * 60 + 30 &&
        updatedTime < 21 * 60 + 30
      ) {
        setIsOpen(true);
        return;
      }

      // Tuesday: 08:30-10:00 or 18:30-21:30
      if (
        today === 2 &&
        ((updatedTime >= 8 * 60 + 30 && updatedTime < 10 * 60) ||
          (updatedTime >= 18 * 60 + 30 && updatedTime < 21 * 60 + 30))
      ) {
        setIsOpen(true);
        return;
      }

      // Wednesday: 08:30-10:00 or 18:00-20:00
      if (
        today === 3 &&
        ((updatedTime >= 8 * 60 + 30 && updatedTime < 10 * 60) ||
          (updatedTime >= 18 * 60 && updatedTime < 20 * 60))
      ) {
        setIsOpen(true);
        return;
      }

      // Other days or times: closed
      setIsOpen(false);
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, []);

  // Function to check if it is the current day
  const isToday = (day: number) => day === currentDay;

  // Map day number to translation key
  const getDayKey = (day: number) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[day];
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-blue-50/30">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and description */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo_black.png"
                alt="StepUp"
                width={50}
                height={50}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              {t("HomePage.about.description")}
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.facebook.com/StepUpMontijo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-blue-50 text-blue-600 p-2.5 rounded-xl transition-all hover:scale-110 shadow-sm border border-blue-100/50"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/stepup_linguas"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-blue-50 text-blue-600 p-2.5 rounded-xl transition-all hover:scale-110 shadow-sm border border-blue-100/50"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@StepUpLanguageCentre"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-blue-50 text-blue-600 p-2.5 rounded-xl transition-all hover:scale-110 shadow-sm border border-blue-100/50"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/351923076858"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-blue-50 text-blue-600 p-2.5 rounded-xl transition-all hover:scale-110 shadow-sm border border-blue-100/50"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-8 text-gray-900 flex items-center">
              <Home className="h-5 w-5 mr-2 text-blue-600" />
              {t("NavBar.home")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500/50 group-hover:bg-blue-500 rounded-full mr-2 transition-colors"></span>
                  {t("NavBar.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/children"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500/50 group-hover:bg-blue-500 rounded-full mr-2 transition-colors"></span>
                  {t("CourseTypes.children")}
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/teenagers"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500/50 group-hover:bg-blue-500 rounded-full mr-2 transition-colors"></span>
                  {t("CourseTypes.teenagers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/adults"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500/50 group-hover:bg-blue-500 rounded-full mr-2 transition-colors"></span>
                  {t("CourseTypes.adults")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500/50 group-hover:bg-blue-500 rounded-full mr-2 transition-colors"></span>
                  {t("NavBar.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500/50 group-hover:bg-blue-500 rounded-full mr-2 transition-colors"></span>
                  {t("NavBar.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-8 text-gray-900 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              {t("NavBar.contact")}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-blue-600/75 group-hover:text-blue-600 mt-0.5 flex-shrink-0 transition-colors" />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                  {t("HomePage.contact.address")}
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-blue-600/75 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
                <a
                  href="mailto:admin@stepupidiomas.pt"
                  className="text-gray-600 group-hover:text-gray-900 transition-colors"
                >
                  {t("HomePage.contact.email")}
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-blue-600/75 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
                <a
                  href="tel:+351923076858"
                  className="text-gray-600 group-hover:text-gray-900 transition-colors"
                >
                  {t("HomePage.contact.phone")}
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-semibold mb-8 text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              {t("Footer.schedule.title")}
            </h3>

            {/* Current status: Open/Closed */}
            <div className="mb-6">
              <div
                className={`
                inline-flex items-center justify-center px-4 py-2 rounded-xl
                ${
                  isOpen
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-red-50 text-red-500 border border-red-100"
                }
                shadow-sm
              `}
              >
                <div
                  className={`
                  w-2 h-2 rounded-full mr-2
                  ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"}
                `}
                ></div>
                <span className="font-medium text-sm">
                  {isOpen
                    ? locale === "en"
                      ? "Open now"
                      : "Aberto agora"
                    : locale === "en"
                    ? "Closed now"
                    : "Encerrado agora"}
                </span>
                {isOpen && (
                  <span className="ml-2 text-xs text-green-600">
                    {currentHour.toString().padStart(2, "0")}:
                    {currentMinute.toString().padStart(2, "0")}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-blue-100/20">
              <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                {/* First column: Monday to Wednesday */}
                <div>
                  {[1, 2, 3].map((day) => (
                    <div
                      key={day}
                      className={`mb-3 ${
                        isToday(day)
                          ? "bg-blue-50/50 border-l-4 border-blue-500 pl-2 rounded-r-lg shadow-sm"
                          : ""
                      } transition-all duration-200`}
                    >
                      <div className="flex flex-col py-1.5">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500/75 mr-2"></div>
                          <span
                            className={`${
                              isToday(day)
                                ? "text-blue-700 font-bold"
                                : "text-gray-900 font-medium"
                            }`}
                          >
                            {t(`Footer.schedule.${getDayKey(day)}`)}
                          </span>
                        </div>

                        {day === 1 && ( // Monday
                          <span className="text-gray-600 ml-4 text-sm">
                            18:30-21:30
                          </span>
                        )}

                        {day === 2 && ( // Tuesday
                          <>
                            <span className="text-gray-600 ml-4 text-sm">
                              08:30-10:00
                            </span>
                            <span className="text-gray-600 ml-4 text-sm">
                              18:30-21:30
                            </span>
                          </>
                        )}

                        {day === 3 && ( // Wednesday
                          <>
                            <span className="text-gray-600 ml-4 text-sm">
                              08:30-10:00
                            </span>
                            <span className="text-gray-600 ml-4 text-sm">
                              18:00-20:00
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second column: Thursday to Sunday */}
                <div>
                  {[4, 5, 6, 0].map((day) => (
                    <div
                      key={day}
                      className={`mb-3 ${
                        isToday(day)
                          ? "bg-blue-50/50 border-l-4 border-blue-500 pl-2 rounded-r-lg shadow-sm"
                          : ""
                      } transition-all duration-200`}
                    >
                      <div className="flex flex-col py-1.5">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400/75 mr-2"></div>
                          <span
                            className={`${
                              isToday(day)
                                ? "text-blue-700 font-bold"
                                : "text-gray-900 font-medium"
                            }`}
                          >
                            {t(`Footer.schedule.${getDayKey(day)}`)}
                          </span>
                        </div>
                        <span className="text-gray-500 ml-4 text-sm italic">
                          {t("Footer.schedule.closed")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-blue-100/50 py-8 bg-gradient-to-r from-white/40 via-blue-50/30 to-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
              <p className="text-sm text-gray-700 font-medium">
                {t("Footer.copyright").replace(
                  "[year]",
                  new Date().getFullYear().toString()
                )}
              </p>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* PLEASE, DON NOT REMOVE THIS COPYRIGHT */}
            {/* Developed by Rafael Soares (https://github.com/rsoaresdev) */}
            {/* ---------------------------------------------------------------- */}

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {locale === "en" ? "Developed with " : "Desenvolvido com "}
              </span>
              <span className="text-red-500 animate-heartbeat">❤️</span>
              <span className="text-xs text-gray-500">
                {locale === "en" ? "by " : "por "}
              </span>
              <a
                href="https://github.com/rsoaresdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Rafael Soares
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
