/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-orange": "#FF4500",
        "dark-gray": "#333333",
        "light-gray": "#f7f7f7",
      },
    },
  },
  plugins: [],
};
