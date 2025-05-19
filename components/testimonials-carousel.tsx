"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsCarousel() {
  const t = useTranslations("HomePage.testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = Array.from({ length: 10 }, (_, i) => ({
    name: t(`testimonial${i + 1}.name`),
    text: t(`testimonial${i + 1}.text`),
    role: t(`testimonial${i + 1}.role`),
  }));

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-display">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Testimonials carousel */}
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <Quote className="h-12 w-12 text-blue-600/20 mb-6" />
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-display">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <cite className="not-italic font-semibold text-gray-900 block font-display">
                    {testimonials[currentIndex].name}
                  </cite>
                  <span className="text-gray-500 text-sm">
                    {testimonials[currentIndex].role}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
