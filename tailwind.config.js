/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./common/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        light: ["Quicksand_300Light", "sans-serif"],
        regular: ["Quicksand_400Regular", "sans-serif"],
        medium: ["Quicksand_500Medium", "sans-serif"],
        semibold: ["Quicksand_600SemiBold", "sans-serif"],
        bold: ["Quicksand_700Bold", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
};
