/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], 
      },
      colors: {
        "solid-white": "#C9CBCC",
        "text-sozen-primary": "#187CBC",
        "text-neutral-70": "#565656",
      },
      screens: {
        large1080: "1080px",
      },
      opacity: {
        65: "0.65",
      },
    },
  },
  plugins: [],
};
