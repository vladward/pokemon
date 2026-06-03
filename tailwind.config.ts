export default {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/views/**/*.{ts,tsx}',
    './src/widgets/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/entities/**/*.{ts,tsx}',
    './src/shared/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      wide: { max: '1400px' },
      desktop: { max: '1200px' },
      laptop: { max: '992px' },
      tablet: { max: '768px' },
      mobile: { max: '576px' },
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)', 'sans-serif'],
      },
      colors: {
        yellow: {
          DEFAULT: '#ffcc00',
          100: '#c7a008',
        },
        lightBlue: '#2a75bb',
        blue: '#334e68',
        white100: '#f4f7fb',

        warning: {
          bg: 'var(--warning-bg)',
          text: 'var(--warning-text)',
        },

        background: 'var(--bg-primary)',
        foreground: 'var(--text)',
        secondary: {
          DEFAULT: 'var(--bg-secondary)',
        },
        tertiary: {
          DEFAULT: 'var(--bg-tertiary)',
        },

        pokemon: {
          fire: 'var(--type-fire)',
          water: 'var(--type-water)',
          grass: 'var(--type-grass)',
          electric: 'var(--type-electric)',
          ice: 'var(--type-ice)',
          fighting: 'var(--type-fighting)',
          poison: 'var(--type-poison)',
          ground: 'var(--type-ground)',
          flying: 'var(--type-flying)',
          psychic: 'var(--type-psychic)',
          bug: 'var(--type-bug)',
          rock: 'var(--type-rock)',
          ghost: 'var(--type-ghost)',
          dragon: 'var(--type-dragon)',
          steel: 'var(--type-steel)',
          fairy: 'var(--type-fairy)',
          dark: 'var(--type-dark)',
          normal: 'var(--type-normal)',
        },

        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
        },
      },
      textShadow: {
        pokemon: `
          -1px -1px 0 #2a75bb,
          1px -1px 0 #2a75bb,
          -1px 1px 0 #2a75bb,
          1px 1px 0 #2a75bb
        `,
      },
      transitionDuration: {
        theme: '400ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }) {
      addUtilities({
        '.shadow-pokemon': {
          textShadow:
            '-1px -1px 0 #2a75bb, 1px -1px 0 #2a75bb, -1px 1px 0 #2a75bb, 1px 1px 0 #2a75bb',
        },
      });
    },
  ],
};
