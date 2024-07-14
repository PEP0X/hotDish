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
        secondary: ["Poppins", "sans-serif"],
        tertiary: ["Playwrite HR", "sans-serif"],
      },
      colors: {
        bg: "#1e1e1e",
        nav: "rgba(0, 0, 0, 0.80)",
        navContent: "#6F7173",
        dark: {
          100: "#2E2E2E",
          200: "#333333",
          300: "#38342F",
          400: "#61513F",
          500: "#75614C",
          600: "#99824A",
          700: "#BDA348",
          800: "#E2C446",
          900: "#FCE544",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
