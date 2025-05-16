/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import animated from "tailwindcss-animated";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-y": {
          "0%, 100%": { backgroundPosition: "50% 0%" },
          "50%": { backgroundPosition: "50% 100%" },
        },
        "gradient-xy": {
          "0%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "100% 50%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "rainbow-border": {
          "0%": { backgroundPosition: "0% 0%" },
          "25%": { backgroundPosition: "100% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-5px) rotate(2deg)" },
          "50%": { transform: "translateY(-10px) rotate(0deg)" },
          "75%": { transform: "translateY(-5px) rotate(-2deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 5s ease infinite",
        "gradient-xy": "gradient-xy 5s ease infinite",
        "rainbow-border": "rainbow-border 3s linear infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "200%": "200% 200%",
        "300%": "300% 300%",
      },
    },
  },
  plugins: [animate, typography, forms, animated],
};

export default config;
