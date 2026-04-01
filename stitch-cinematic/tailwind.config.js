/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#182a21', container: '#2e4036' },
        secondary: { DEFAULT: '#a53c19', container: '#ff7e55' },
        clay: '#cc5833',
        surface: {
          DEFAULT: '#fbf9f2',
          dim: '#dcdad3',
          bright: '#fbf9f2',
          container: {
            DEFAULT: '#f0eee7',
            low: '#f6f4ec',
            high: '#eae8e1',
            highest: '#e4e2dc',
            lowest: '#ffffff',
          },
        },
        tertiary: { DEFAULT: '#262626', container: '#3c3c3c' },
        'on-surface': '#1b1c18',
        'on-primary': '#ffffff',
        'outline-variant': '#c3c8c2',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
        label: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '3rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      boxShadow: {
        ambient: '0 40px 60px -15px rgba(24, 42, 33, 0.04)',
      },
    },
  },
  plugins: [],
}
