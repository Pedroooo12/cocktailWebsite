/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          black: '#000000',       // Negro profundo
          violet: '#5B0E8D',      // Violeta intenso
          darkGray: '#2D2D2D',    // Gris oscuro
          lavender: '#C2A3D0',    // Lavanda suave
        },
      }
    },
  },
  plugins: [],
}
