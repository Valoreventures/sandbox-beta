/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'papyrus': {
          DEFAULT: '#f5f5dc', // A papyrus-like beige
          'light': '#fafaf0', // A lighter shade of papyrus
          'dark': '#e5e5c7'  // A darker shade of papyrus
        },
        'scroll': {
          DEFAULT: '#d2b48c', // A tan color similar to aged paper
          'light': '#e5cda0', // A lighter tan
          'dark': '#b09a6b'  // A darker tan
        },
        // ... other colors from your palette ...

    },
  },
  plugins: [],
}

