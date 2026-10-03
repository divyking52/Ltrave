/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: '#F6D9DC',
          50: '#FDF7F8',
          100: '#FAF0F2',
          200: '#F6D9DC',
          300: '#EEC2C7',
          400: '#E5A5AD',
        },
        mint: {
          DEFAULT: '#D9F0E4',
          50: '#F5FAF7',
          100: '#EAF6F0',
          200: '#D9F0E4',
          300: '#BCE4CE',
          400: '#9DD5B5',
        },
        lavender: {
          DEFAULT: '#E2DDF5',
          50: '#FAF9FE',
          100: '#F1EFFB',
          200: '#E2DDF5',
          300: '#C8BEEC',
          400: '#ACA0DF',
        },
        babyblue: {
          DEFAULT: '#DCECF8',
          50: '#F7FBFE',
          100: '#ECF5FC',
          200: '#DCECF8',
          300: '#BFDCF2',
          400: '#9FC8E9',
        },
        paleyellow: {
          DEFAULT: '#F8EDC8',
          50: '#FDFBF4',
          100: '#FAF5E3',
          200: '#F8EDC8',
          300: '#F3E1A3',
          400: '#EDD47C',
        },
        cream: {
          DEFAULT: '#FFF9F4',
          50: '#FFFFFF',
          100: '#FFFDFB',
          200: '#FFF9F4',
          300: '#FBF1E6',
          400: '#F5E4D1',
        },
        charcoal: {
          DEFAULT: '#29272A',
          50: '#757077',
          100: '#5F5B61',
          200: '#4B474C',
          300: '#3A373B',
          400: '#29272A',
          900: '#1B1A1C',
        },
      },
      fontFamily: {
        brand: ['"Bodoni Moda"', '"Playfair Display"', '"Prata"', '"Cormorant Garamond"', 'serif'],
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        display: ['"DM Serif Display"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'Manrope', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(41, 39, 42, 0.04)',
        'soft-lg': '0 18px 45px rgba(41, 39, 42, 0.07)',
        'soft-xl': '0 25px 60px rgba(41, 39, 42, 0.09)',
        'glow-pink': '0 12px 35px rgba(246, 217, 220, 0.45)',
        'glow-mint': '0 12px 35px rgba(217, 240, 228, 0.45)',
        'glow-lavender': '0 12px 35px rgba(226, 221, 245, 0.45)',
      },
      borderRadius: {
        'organic-1': '2rem 1.5rem 2.2rem 1.7rem',
        'organic-2': '1.7rem 2.2rem 1.5rem 2rem',
        'organic-blob': '40% 60% 70% 30% / 40% 50% 60% 50%',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 9s ease-in-out 3s infinite',
        'pulse-subtle': 'pulseSlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
