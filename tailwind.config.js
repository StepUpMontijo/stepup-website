/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}; 