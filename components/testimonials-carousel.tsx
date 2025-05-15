"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import HandwrittenUnderline from "@/components/handwritten-underline";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function TestimonialsCarousel() {
  const t = useTranslations("HomePage.testimonials");
  const isMounted = useIsMounted();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Mobile carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const totalTestimonials = 10;

  // Desktop carousel state
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [cardWidth, setCardWidth] = useState(326); // Largura do card + margens

  // Function to get the initials of the name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Function to generate a background color based on the name
  const getColorFromName = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-red-500",
      "bg-cyan-500",
      "bg-amber-500",
    ];

    const sum = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Measure card width
  useEffect(() => {
    if (!isMounted) return;

    const updateCardWidth = () => {
      if (carouselRef.current && carouselRef.current.children.length > 0) {
        const firstCard = carouselRef.current.children[0] as HTMLElement;
        const computedStyle = window.getComputedStyle(firstCard);
        const width =
          firstCard.offsetWidth +
          parseInt(computedStyle.marginLeft) +
          parseInt(computedStyle.marginRight);
        setCardWidth(width);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, [isMounted]);

  // Infinite and continuous auto-scroll
  useEffect(() => {
    if (!isMounted || isMobile) return;

    // Constant speed for smooth movement
    const pixelsPerSecond = 30; // Adjust to desired speed
    let lastTimestamp = 0;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Ensure we don't have extreme values after tab change, etc.
      const delta = (Math.min(elapsed, 100) * pixelsPerSecond) / 1000;

      setPosition((prev) => {
        // New position based on speed and elapsed time
        let newPos = prev - delta;

        // Check if we've passed the end of the first set of cards
        if (newPos < -(cardWidth * totalTestimonials)) {
          // Calculate the excess beyond the limit
          const overflow = newPos + cardWidth * totalTestimonials;

          // Move to the start of the second set, preserving exactly the same relative position for perfect continuity
          newPos = overflow;
        }

        return newPos;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isMounted, isMobile, cardWidth, totalTestimonials]);

  // Auto rotate on mobile
  useEffect(() => {
    if (!isMounted || !isMobile) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalTestimonials);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMounted, isMobile, totalTestimonials]);

  // Manual navigation on mobile
  const goToNextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % totalTestimonials);
  };

  const goToPreviousTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials
    );
  };

  // Testimonial card component with responsive sizes
  const TestimonialCard = ({
    index,
    isMobileView = false,
  }: {
    index: number;
    isMobileView?: boolean;
  }) => {
    const name = t(`testimonial${index + 1}.name`);
    const initials = getInitials(name);
    const colorClass = getColorFromName(name);

    return (
      <div
        className={`flex-shrink-0 bg-white rounded-lg shadow-md p-6 ${
          isMobileView ? "w-full max-w-md mx-auto" : "w-[300px] mx-3"
        }`}
      >
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg`}
          >
            {initials}
          </div>
          <div className="ml-4">
            <p className="font-bold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">
              {t(`testimonial${index + 1}.role`)}
            </p>
          </div>
        </div>

        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>

        <blockquote className="text-gray-700">
          <p className="text-sm italic">{t(`testimonial${index + 1}.text`)}</p>
        </blockquote>
      </div>
    );
  };

  if (!isMounted) return null;

  // Mobile version - single card with navigation
  if (isMobile) {
    return (
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              <HandwrittenUnderline
                text={t("title")}
                highlightText={t("title")}
                delay={0.5}
                color="#10b981"
              />
            </h2>
            <p className="text-lg text-gray-600">{t("subtitle")}</p>
          </div>

          <div className="relative px-4 sm:px-8 max-w-md mx-auto">
            {/* Navigation buttons */}
            <button
              onClick={goToPreviousTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center bg-white/80 rounded-full shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={goToNextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center bg-white/80 rounded-full shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Testimonial card */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mx-auto"
            >
              <TestimonialCard index={activeIndex} isMobileView={true} />
            </motion.div>

            {/* Pagination points */}
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(totalTestimonials)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === activeIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-label={`Ir para testemunho ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version - carousel with only infinite auto-scroll
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-5">
        <Quote size={120} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5">
        <Quote size={120} />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            <HandwrittenUnderline
              text={t("title")}
              highlightText={t("title")}
              delay={0.5}
              color="#10b981"
            />
          </h2>
          <p className="text-xl text-gray-600">{t("subtitle")}</p>
        </div>

        {/* Container with side shadows */}
        <div
          ref={containerRef}
          className="relative max-w-full mx-auto overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Carousel with only automatic movement */}
          <div
            ref={carouselRef}
            className="flex"
            style={{ transform: `translateX(${position}px)` }}
          >
            {/* Duplicar os cards para criar dois conjuntos idênticos */}
            {[...Array(totalTestimonials * 2)].map((_, i) => {
              const absoluteIndex = i % totalTestimonials;
              return (
                <TestimonialCard key={`card-${i}`} index={absoluteIndex} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
