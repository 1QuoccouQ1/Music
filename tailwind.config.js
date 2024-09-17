/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medium': '#0A1827',
        'sidebar': '#101F32',
      },
    },
  },
  plugins: [
  ],
}

