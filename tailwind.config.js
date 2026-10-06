/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ngo: {
          green: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981', // Vibrant Bright Emerald
            600: '#059669', // Vibrant Emerald Primary
            700: '#15803d', // Official Deep Logo Green
            800: '#166534',
            900: '#064e3b',
            950: '#022c22',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b', // Vibrant Gold Amber
            600: '#d97706', // Rich Gold
            700: '#a67c1e', // Official Logo Gold
            800: '#845e13',
            900: '#78350f',
          },
          accent: {
            red: '#ef4444',
            blue: '#2563eb',
            pink: '#ec4899',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ngo': '0 8px 30px -4px rgba(5, 150, 105, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'ngo-gold': '0 8px 30px -4px rgba(217, 119, 6, 0.16), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'gold-glow': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
}
