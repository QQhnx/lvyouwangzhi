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
          DEFAULT: '#4A1A4A',
          light: '#6B3A6B',
          dark: '#2A0A2A',
        },
        accent: {
          DEFAULT: '#C9A96E',
          light: '#E0C890',
        },
        gold: '#C9A96E',
        purple: '#4A1A4A',
        red: '#8B1A1A',
        black: '#1A1A1A',
        garden: '#2D4A2D',
        lake: '#3A5A6A',
        paper: '#F5F0E8',
        border: '#4A1A4A',
      },
      fontFamily: {
        serif: ['STFangsong', '华文仿宋', 'FangSong', 'SimSun', 'serif'],
        sans: ['STFangsong', '华文仿宋', 'FangSong', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 16px rgba(26, 26, 26, 0.08)',
        'card-hover': '0 8px 32px rgba(74, 26, 74, 0.15)',
        'card-elevated': '0 4px 24px rgba(74, 26, 74, 0.10), 0 1px 4px rgba(0,0,0,0.06)',
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
