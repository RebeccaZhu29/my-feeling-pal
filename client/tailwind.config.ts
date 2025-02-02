/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FAF3E1',
        'title-cream': '#FEFAE0',
        'emerald': {
          800: '#0D4F42',
          
        },
        'purple': {
          700: '#7B2869',
        },
      },
      dropShadow: {
        'lg': '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        'serif': ['"Source Serif Pro"', 'serif'],
      },
    },
  },
  plugins: [],
} 