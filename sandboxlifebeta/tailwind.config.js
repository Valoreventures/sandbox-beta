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
      // Brand colors
      bgpapyrus: '#f5f5dc',
      lightpapyrus: '#fafaf0',
      darkpapyrus: '#e5e5c7',
      red: '#9B1D1E',
      // Extended color palette for design system
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      // 8-point spacing system for consistent layout
      spacing: {
        '0': '0',         // 0px
        '1': '0.25rem',   // 4px - base unit
        '2': '0.5rem',    // 8px - 1 unit
        '3': '0.75rem',   // 12px - 1.5 units
        '4': '1rem',      // 16px - 2 units
        '5': '1.25rem',   // 20px - 2.5 units
        '6': '1.5rem',    // 24px - 3 units
        '7': '1.75rem',   // 28px - 3.5 units
        '8': '2rem',      // 32px - 4 units
        '10': '2.5rem',   // 40px - 5 units
        '12': '3rem',     // 48px - 6 units
        '14': '3.5rem',   // 56px - 7 units
        '16': '4rem',     // 64px - 8 units
        '18': '4.5rem',   // 72px
        '20': '5rem',     // 80px - 10 units
        '24': '6rem',     // 96px - 12 units
        '28': '7rem',     // 112px - 14 units
        '32': '8rem',     // 128px - 16 units
        '36': '9rem',     // 144px - 18 units
        '40': '10rem',    // 160px - 20 units
        '44': '11rem',    // 176px - 22 units
        '48': '12rem',    // 192px - 24 units
        '52': '13rem',    // 208px - 26 units
        '56': '14rem',    // 224px - 28 units
        '60': '15rem',    // 240px - 30 units
        '64': '16rem',    // 256px - 32 units
        // Design system semantic spacing tokens
        'section': '2rem',      // 32px - Between major sections
        'component': '1.5rem',  // 24px - Between components
        'card': '1rem',         // 16px - Between cards
        'internal': '0.5rem',   // 8px - Internal component spacing
      },
      // Z-index scale for proper layering
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'notification': '1080',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',   // 2px
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem',   // 6px
        'lg': '0.5rem',     // 8px
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
        '4xl': '2rem',      // 32px
        'full': '9999px',
        'card': '0.5rem',   // 8px - consistent card radius
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],    // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
        '5xl': ['3rem', { lineHeight: '1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px
        '8xl': ['6rem', { lineHeight: '1' }],          // 96px
        '9xl': ['8rem', { lineHeight: '1' }],          // 128px
      },
      // Grid gap utilities for responsive design
      gap: {
        'mobile': '1rem',    // 16px - mobile grid gap
        'tablet': '1.5rem',  // 24px - tablet grid gap
        'desktop': '2rem',   // 32px - desktop grid gap
      },
      // Maximum width utilities for layout containers
      maxWidth: {
        'none': 'none',
        'xs': '20rem',      // 320px
        'sm': '24rem',      // 384px
        'md': '28rem',      // 448px
        'lg': '32rem',      // 512px
        'xl': '36rem',      // 576px
        '2xl': '42rem',     // 672px
        '3xl': '48rem',     // 768px
        '4xl': '56rem',     // 896px
        '5xl': '64rem',     // 1024px
        '6xl': '72rem',     // 1152px
        '7xl': '80rem',     // 1280px - dashboard max width
        'full': '100%',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
    },
  },
  plugins: [],
};
