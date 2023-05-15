/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
     "./node_modules/tw-elements/dist/js/**/*.js"

  ],
  theme: {
    extend: {
      colors: {
        /** primary */
        "prosperity": "#FCFF52",
        "forest": "#476520",
        /** base */
        "gypsum": "#FCF6F1",
        "sand": "#E7E3D4",
        "wood": "#655947",
        "fig": "#1E002B",
        /** functional */
        "snow": "#FFFFFF",
        "onyx": "#CCCCCC",
        "success": "#329F3B",
        "error": "#E70532",
        "disabled": "#9B9B9B",
        /** accent */
        "sky": "#7CC0FF",
        "citrus": "#FF9A51",
        "lotus": "#FFA3EB",
        "lavender": "#B490FF",
        "background": "#222222",
        "accent": "#048A81",
        "darkshade1": "#1c1c1c",
        "darkshade2": "#151515",
        "darkshade3": "#0e0e0e"
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}