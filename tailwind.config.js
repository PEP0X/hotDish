/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["dark"],
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", "sans-serif"],
      },
      colors: {
        bg: "#1e1e1e",
        nav: "rgba(0, 0, 0, 0.47)",
        navContent: "#6F7173",
      },
    },
  },
  plugins: [require("daisyui")],
};
