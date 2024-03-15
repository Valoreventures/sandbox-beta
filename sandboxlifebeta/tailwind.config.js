/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      bgpapyrus: '#f5f5dc',
      lightpapyrus: '#fafaf0',
      darkpapyrus: '#e5e5c7',
      red: '#9B1D1E',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      // spacing: {
      //   128: '32rem',
      //   144: '36rem',
      // },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
