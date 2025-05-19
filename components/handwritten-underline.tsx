"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface HandwrittenUnderlineProps {
  text: string;
  highlightText: string;
  className?: string;
  delay?: number;
  color?: string;
}

const HandwrittenUnderline: React.FC<HandwrittenUnderlineProps> = ({
  text,
  highlightText,
  className = "",
  delay = 0.5,
  color = "#2b085c", // Default orange color
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 // Minimum amount needed to trigger
  });
  const controls = useAnimation();

  // Optimize animation using will-change
  useEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLElement;
      element.style.willChange = 'opacity, transform';
      
      return () => {
        element.style.willChange = 'auto';
      };
    }
  }, []);

  // Find the position of the highlighted text
  const parts = text.split(highlightText);
  const beforeText = parts[0];
  const afterText = parts[1] || "";

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <span ref={ref} className={`relative inline-block ${className} transform-gpu`}>
      {beforeText}
      <span className="relative">
        {highlightText}
        <motion.svg
          className="absolute left-0 w-full pointer-events-none"
          style={{ 
            bottom: "-5px", 
            height: "15px",
            willChange: "opacity, transform"
          }}
          viewBox="0 0 100 15"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.2, delay },
            },
          }}
          preserveAspectRatio="none"
        >
          {/* Main path - adjusted to cover the entire width */}
          <motion.path
            d="M0,8.5 C15,6 30,11 50,8.5 C70,5 85,12 100,8.5"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={
              isInView
                ? {
                    pathLength: 1,
                    transition: {
                      delay: delay + 0.1,
                      duration: 1.2,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
          />

          {/* Secondary path - adjusted to cover the entire width */}
          <motion.path
            d="M0,10 C20,7 35,13 50,9 C65,6 80,11 100,8"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={0.6}
            initial={{ pathLength: 0 }}
            animate={
              isInView
                ? {
                    pathLength: 1,
                    transition: {
                      delay: delay + 0.25,
                      duration: 1.1,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
          />
        </motion.svg>
      </span>
      {afterText}
    </span>
  );
};

export default HandwrittenUnderline;
