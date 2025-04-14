/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6', 
          light: '#93C5FD',
          dark: '#1E3A8A',
        },
        gray: {
          950: '#0f172a', 
        },
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};
