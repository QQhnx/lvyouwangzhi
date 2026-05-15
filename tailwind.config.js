/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B1A1A',
          light: '#B85450',
          dark: '#5C0F0F',
        },
        accent: {
          DEFAULT: '#D4A574',
          light: '#E8C9A0',
        },
        garden: '#2D5A3D',
        lake: '#4A7C8C',
        paper: '#F5F0E8',
        border: '#E0D5C5',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'Songti SC', 'SimSun', 'serif'],
        sans: ['Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
