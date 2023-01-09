/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // H1d - HireOne Dark Theme
      'H1d-body': '#121212',
      'H1d-font-primary': '#C7C7C7',
      'H1d-ui-primary': '#50B5FF',
      'H1d-ui-secondary': '#152027',
      'H1d-ui-bg': '#000'

    }
  },
  plugins: [],
}
