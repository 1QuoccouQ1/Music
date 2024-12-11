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
      boxShadow: {
        'medium': '0 15px 20px -12px rgba(0, 0, 0, 0.25)',
        'medium-xl': '0 10px 15px -14px #2c2c2d',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // Ẩn thanh cuộn cho Chrome, Safari, Edge
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        // Ẩn thanh cuộn cho Firefox
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  // IE and Edge
          'scrollbar-width': 'none',     // Firefox
        },
      };
      addUtilities(newUtilities);
    },
  ],
}

