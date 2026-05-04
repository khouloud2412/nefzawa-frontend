/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // pour le HTML principal
    "./src/**/*.{js,jsx}", // pour tous tes composants React
  ],
  theme: {
    extend: {
      fontFamily: {
        // Pour l'arabe
        arabic: ['"Noto Kufi Arabic"', "sans-serif"],
        // Pour le français/anglais
        latin: ["Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [],
}
