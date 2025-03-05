/** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin');

export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {},
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".line-clamp-1": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
        },
      });
    },
  ]
};
