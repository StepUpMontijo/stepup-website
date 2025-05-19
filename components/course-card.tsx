"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      {/* Image container */}
      <div className="relative h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

        {/* Button */}
        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link
            href={href}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            {t("learnMore")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
