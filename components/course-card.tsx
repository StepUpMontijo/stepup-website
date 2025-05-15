"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function CourseCard({
  title,
  description,
  image,
  href,
}: CourseCardProps) {
  const t = useTranslations("HomePage.courses");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative background with animated gradient */}
      <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-0 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-700 animate-gradient-x bg-300%"></div>

      {/* Main card */}
      <div className="relative h-full flex flex-col bg-gradient-to-br from-white via-white to-slate-50 rounded-3xl overflow-hidden border border-slate-200/50 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:[transform-style:preserve-3d] group-hover:[transform:perspective(1000px)_rotateY(5deg)]">
        {/* Corner glow effect */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>

        {/* Decorative background patterns */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#2b085c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Image container - fixed height */}
        <div className="relative h-52 overflow-hidden rounded-t-3xl">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>

          {/* Title overlay positioning */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-md">
              {title}
            </h3>
          </div>
        </div>

        {/* Card content - with flex-grow to push button to bottom */}
        <div className="p-6 flex flex-col flex-grow relative">
          {/* Description */}
          <p className="text-slate-600 leading-relaxed mb-6">{description}</p>

          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>

          {/* Learn more button - improved design */}
          <div className="mt-auto">
            <Link
              href={href}
              className="block w-full text-center py-3 px-4 bg-gradient-to-r from-primary to-secondary text-black rounded-xl font-medium shadow-md border border-white/10 hover:brightness-105 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                {t("learnMore")}
                <ArrowRight
                  className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
