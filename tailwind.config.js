/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "flex",
    "justify-center",
    "basis-1/2",
    "gap-4",
    "items-center",
    "gap-2",
    "my-4",
    "bg-[#7A306C]",
    "p-1",
    "rounded-2xl",
    "font-semibold",
    "align-middle",
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
      colors: {
        button: "#bad8d5",
      },
    },
  },
  plugins: [],
};
