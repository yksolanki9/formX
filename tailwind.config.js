/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-pink": "rgb(247, 230, 230)",
        "dark-red": "rgb(175, 4, 4)",
      },
      boxShadow: {
        btn: "rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset",
        "btn-selected": "rgba(255, 255, 255, 0.8) 0px 0px 0px 2px inset",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: "#__next",
};
