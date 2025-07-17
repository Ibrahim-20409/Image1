/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Times New Roman", "Georgia", "serif"], // Updated to include Times New Roman
        mono: ["Menlo", "Monaco", "Courier New", "monospace"],
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
