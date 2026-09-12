/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mango: {
          primary: '#087F23',
          dark: '#006B18',
          deep: '#044812',
          deeper: '#02330c',
          light: '#EAF8E5',
          pale: '#F4FBF2',
          yellow: '#F6C928',
          amber: '#FBBF24',
          orange: '#F59E0B',
          text: '#222222',
          muted: '#555555',
          subtle: '#777777',
          border: '#e5e7eb',
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'page': '1120px',
      },
      boxShadow: {
        'card': '0 2px 8px -1px rgba(0, 0, 0, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 20px -3px rgba(8, 127, 35, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'hero-btn': '0 4px 14px 0 rgba(8, 127, 35, 0.39)',
      }
    },
  },
  plugins: [],
}
