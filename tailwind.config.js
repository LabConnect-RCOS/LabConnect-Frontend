/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables toggling dark mode by adding dark class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
