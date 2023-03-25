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
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
