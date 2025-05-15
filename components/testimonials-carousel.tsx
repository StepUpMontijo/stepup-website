"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, useAnimation } from "framer-motion";
import { Star, Quote } from "lucide-react";
import HandwrittenUnderline from "@/components/handwritten-underline";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function TestimonialsCarousel() {
  const t = useTranslations("HomePage.testimonials");
  const isMounted = useIsMounted();
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [currentPosition, setCurrentPosition] = useState(0);
  const animationDuration = 60; // seconds
  const animationDistance = 3000; // pixels

  // Total of testimonials available in translations
  const totalTestimonials = 10;

  // Function to get the initials of the name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Function to start the animation
  const startAnimation = useCallback(() => {
    // Calculate the speed in pixels per second
    const pixelsPerSecond = animationDistance / animationDuration;

    // Calculate how much time it would take to travel the current distance to the end
    const remainingDistance = animationDistance + currentPosition; // Considering that currentPosition is negative when moving to the left
    const remainingTime = remainingDistance / pixelsPerSecond;

    controls.start({
      x: -animationDistance,
      transition: {
        x: {
          from: currentPosition,
          duration: remainingTime,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    });
  }, [animationDistance, animationDuration, currentPosition, controls]);

  // Effect to start the animation when the component mounts
  useEffect(() => {
    // We no longer need to check if it is mounted
    // Start the animation when the component mounts
    startAnimation();
  }, [startAnimation]);

  // Effect to pause/continue the animation
  useEffect(() => {
    if (isPaused && !isDragging) {
      // Pause the animation only if not dragging
      controls.stop();
    } else if (!isPaused) {
      // Continue the animation from where it stopped
      startAnimation();
    }
  }, [isPaused, isDragging, controls, startAnimation]);

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

    // Use the sum of the ASCII codes of the letters of the name to determine the color
    const sum = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Event handlers for dragging
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent text selection when dragging
    e.preventDefault();

    setIsDragging(true);
    setIsPaused(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX === 0 || !isDragging) return;

    // Prevent text selection when dragging
    e.preventDefault();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX;
    setDragOffset(diff);

    // Update the position in real time during the drag
    controls.set({ x: currentPosition + diff });
  };

  const handleDragEnd = () => {
    if (dragStartX === 0 || !isDragging) return;

    // Update the current position with the drag offset
    const newPosition = currentPosition + dragOffset;
    setCurrentPosition(newPosition);
    setDragStartX(0);
    setDragOffset(0);
    setIsDragging(false);

    if (!isPaused) return; // If the user has already moved the mouse outside, do nothing
    setIsPaused(false);
  };

  // Event handlers for mouse enter/leave
  const handleMouseEnter = () => {
    if (isDragging) return; // Do not pause if dragging
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (isDragging) return; // Do not continue if dragging
    setIsPaused(false);
  };

  // Function to update the current position when the animation is in progress
  useEffect(() => {
    if (isPaused) return;

    // Update the current position periodically to track the progress of the animation
    const interval = setInterval(() => {
      // Calculate the speed in pixels per second
      const pixelsPerSecond = animationDistance / animationDuration;

      // Update the position based on the elapsed time
      setCurrentPosition((prev) => {
        // If it has reached the end, restart
        if (prev <= -animationDistance) {
          return 0;
        }
        // Otherwise, continue moving
        return prev - pixelsPerSecond * 0.1; // 0.1 second = interval
      });
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [isPaused, animationDistance, animationDuration]);

  // Add global listener to detect when the mouse is released outside the component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragStartX(0);
        setDragOffset(0);

        if (!isPaused) return;
        setIsPaused(false);
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging, isPaused]);

  if (!isMounted) return null;

  // Create a duplicated list of testimonials for the infinite effect
  const testimonialCards = [...Array(totalTestimonials * 2)].map((_, i) => {
    const index = i % totalTestimonials;
    const name = t(`testimonial${index + 1}.name`);
    const initials = getInitials(name);
    const colorClass = getColorFromName(name);

    return (
      <div
        key={i}
        className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md p-6 mx-3"
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
  });

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

        {/* Interaction indicators */}
        <div className="flex justify-center mb-8 text-gray-500 text-sm">
          <div className="flex items-center mr-4">
            <span className="inline-block w-6 h-1 bg-blue-500 rounded mr-2"></span>
            <span>{t("dragToScroll")}</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-6 h-1 bg-green-500 rounded mr-2"></span>
            <span>{t("hoverToPause")}</span>
          </div>
        </div>

        {/* Container with side shadows to indicate continuity */}
        <div className="relative max-w-full mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Container with the cards with animation */}
          <div
            ref={containerRef}
            className="overflow-hidden select-none cursor-grab"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onDragStart={(e) => e.preventDefault()} // Prevent default drag behavior
          >
            <motion.div className="flex" animate={controls} initial={{ x: 0 }}>
              {testimonialCards}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
