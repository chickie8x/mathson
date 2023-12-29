/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'September': ['September'],
        'Nunito': ['Nunito']
      }
    },
  },
  plugins: [],
}

