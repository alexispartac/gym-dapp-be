/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {},
};
export const plugins = [
  function ({ addUtilities }) {
    addUtilities({
      ".scrollbar-hide": {
        "-ms-overflow-style": "none", 
        "scrollbar-width": "none", 
      },
      ".scrollbar-hide::-webkit-scrollbar": {
        display: "none", 
      },
    });
  },
];
