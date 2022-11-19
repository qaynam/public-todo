/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans-jp": ["Noto Sans JP", "sans-serif"],
        "noto-sans-mono": ["Noto Sans Mono", "monospace"]
      }
    },
  },
  plugins: [],
}
