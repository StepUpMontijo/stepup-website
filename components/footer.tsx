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
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="StepUp"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              {t("HomePage.about.description")}
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/StepUpMontijo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/stepup_linguas"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@StepUpLanguageCentre"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/351923076858"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 border-b border-gray-200 pb-2 flex items-center">
              <Home className="h-5 w-5 mr-2 text-blue-600" />
              {t("NavBar.home")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {t("NavBar.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/children"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {t("CourseTypes.children")}
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/teenagers"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {t("CourseTypes.teenagers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/adults"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {t("CourseTypes.adults")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {t("NavBar.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {t("NavBar.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 border-b border-gray-200 pb-2 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              {t("NavBar.contact")}
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">
                  {t("HomePage.contact.address")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <a
                  href="mailto:admin@stepupidiomas.pt"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t("HomePage.contact.email")}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <a
                  href="tel:+351923076858"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t("HomePage.contact.phone")}
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 border-b border-gray-200 pb-2 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              {t("Footer.schedule.title")}
            </h3>

            {/* Current status: Open/Closed */}
            <div className="mb-4 flex items-center">
              <div
                className={`
                flex items-center justify-center px-4 py-2 rounded-full 
                ${
                  isOpen
                    ? "bg-green-100 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-100 text-red-500"
                }
                shadow-sm
              `}
              >
                <div
                  className={`
                  w-2.5 h-2.5 rounded-full mr-2
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

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                {/* First column: Monday to Wednesday */}
                <div>
                  {[1, 2, 3].map((day) => (
                    <div
                      key={day}
                      className={`mb-3 ${
                        isToday(day)
                          ? "bg-blue-50 border-l-4 border-blue-500 pl-2 rounded-r-lg shadow-sm"
                          : ""
                      } transition-all duration-200`}
                    >
                      <div className="flex flex-col py-1.5">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
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
                          ? "bg-blue-50 border-l-4 border-blue-500 pl-2 rounded-r-lg shadow-sm"
                          : ""
                      } transition-all duration-200`}
                    >
                      <div className="flex flex-col py-1.5">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-400 mr-2"></div>
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
      <div className="border-t border-gray-200 py-6 bg-white bg-opacity-70">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="text-sm text-gray-600 flex items-center">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {t("Footer.copyright").replace(
              "[year]",
              new Date().getFullYear().toString()
            )}
          </p>

          {/* ---------------------------------------------------------------- */}
          {/* PLEASE, DON NOT REMOVE THIS COPYRIGHT */}
          {/* Developed by Rafael Soares (https://github.com/rsoaresdev) */}
          {/* ---------------------------------------------------------------- */}

          <p className="text-xs text-gray-500 mt-2">
            {locale === "en" ? "Made with ❤️ by " : "Feito com ❤️ por "}
            <a
              href="https://github.com/rsoaresdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Rafael Soares
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
