/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/style/**/*.{css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
