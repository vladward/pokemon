import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';

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
      gridTemplateColumns: {
        pokemon: 'repeat(auto-fill, minmax(240px, 1fr))',
      },
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

        /* Pokédex device theme colors */
        pokedex: {
          shell: {
            50: 'var(--pdx-shell-50)',
            100: 'var(--pdx-shell-100)',
            300: 'var(--pdx-shell-300)',
            500: 'var(--pdx-shell-500)',
            700: 'var(--pdx-shell-700)',
            900: 'var(--pdx-shell-900)',
          },
          metal: {
            100: 'var(--pdx-metal-100)',
            500: 'var(--pdx-metal-500)',
            900: 'var(--pdx-metal-900)',
          },
          screen: {
            0: 'var(--pdx-screen-bg-0)',
            1: 'var(--pdx-screen-bg-1)',
            2: 'var(--pdx-screen-bg-2)',
          },
          hud: {
            cyan: 'var(--pdx-hud-cyan)',
            amber: 'var(--pdx-hud-amber)',
            red: 'var(--pdx-hud-red)',
            green: 'var(--pdx-hud-green)',
            ink: 'var(--pdx-hud-ink)',
            'ink-dim': 'var(--pdx-hud-ink-dim)',
          },
          led: {
            cyan: 'var(--pdx-led-cyan)',
            core: 'var(--pdx-led-cyan-core)',
          },
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
      boxShadow: {
        'pdx-shell': 'var(--pdx-sh-shell-outer)',
        'pdx-screen-inset': 'var(--pdx-sh-screen-inset)',
        'pdx-led-glow': 'var(--pdx-sh-led-glow)',
        'pdx-hud-corner': 'var(--pdx-sh-hud-corner-glow)',
        'pdx-button-recess': 'var(--pdx-sh-button-recess)',
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
        holoShift: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
        },
        sovereignShimmer: {
          '0%': { transform: 'rotate(20deg) translateX(-200px)', opacity: '0' },
          '58%': { transform: 'rotate(20deg) translateX(-200px)', opacity: '0' },
          '63%': { transform: 'rotate(20deg) translateX(-200px)', opacity: '1' },
          '83%': { transform: 'rotate(20deg) translateX(440px)', opacity: '1' },
          '88%': { transform: 'rotate(20deg) translateX(440px)', opacity: '0' },
          '100%': { transform: 'rotate(20deg) translateX(-200px)', opacity: '0' },
        },
        edgeBreathe: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        coronaBreathe: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.88)' },
          '50%': { opacity: '0.5', transform: 'scale(1.08)' },
        },
        etherealFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        auroraShift: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '0% 65%' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.4)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        radiantPulse: {
          '0%': { opacity: '0.5', transform: 'scale(0.5)' },
          '100%': { opacity: '0', transform: 'scale(2.0)' },
        },
        iridShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        imageBreath: {
          '0%, 100%': { transform: 'scale(1.00)' },
          '50%': { transform: 'scale(1.03)' },
        },
        reticlePulse: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.78)' },
          '50%': { opacity: '0.7', transform: 'scale(1.18)' },
        },
        embersRise: {
          '0%, 100%': { opacity: '0.35', transform: 'scaleY(0.88) translateY(5px)' },
          '50%': { opacity: '0.65', transform: 'scaleY(1.12) translateY(-5px)' },
        },
        cosmicPulse: {
          '0%, 100%': { opacity: '0.18', transform: 'scale(0.88)' },
          '50%': { opacity: '0.42', transform: 'scale(1.12)' },
        },
        'pokeball-bounce': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-44px) rotate(180deg)' },
        },
        'pokeball-shadow': {
          '0%, 100%': { transform: 'scaleX(1)', opacity: '0.25' },
          '50%': { transform: 'scaleX(0.35)', opacity: '0.06' },
        },
        /* Pokédex device keyframes */
        pdxStreakSweep: {
          '0%': { transform: 'translateX(-120%) rotate(-20deg)', opacity: '0' },
          '8%': { opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { transform: 'translateX(120%) rotate(-20deg)', opacity: '0' },
        },
        pdxLedBreathe: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        pdxBootScan: {
          '0%': { top: '0%', opacity: '1' },
          '90%': { top: '100%', opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        pdxStatFill: {
          from: { opacity: '0', transform: 'scaleX(0)' },
          to: { opacity: '1', transform: 'scaleX(1)' },
        },
        pdxCaret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        holo: 'holoShift 5s linear infinite',
        'sovereign-shimmer': 'sovereignShimmer 7s ease-in-out infinite',
        'edge-breathe': 'edgeBreathe 3s ease-in-out infinite',
        'corona-breathe': 'coronaBreathe 4s ease-in-out infinite',
        'ethereal-float': 'etherealFloat 4s ease-in-out infinite',
        'aurora-shift': 'auroraShift 12s ease-in-out infinite',
        'star-twinkle': 'starTwinkle 2s ease-in-out infinite',
        'radiant-pulse': 'radiantPulse 2.4s ease-out infinite',
        'irid-shimmer': 'iridShimmer 14s ease-in-out infinite',
        'image-breath': 'imageBreath 5s ease-in-out infinite',
        'reticle-pulse': 'reticlePulse 3.5s ease-in-out infinite',
        'embers-rise': 'embersRise 3s ease-in-out infinite',
        'cosmic-pulse': 'cosmicPulse 5s ease-in-out infinite',
        'pokeball-bounce': 'pokeball-bounce 0.85s ease-in-out infinite',
        'pokeball-shadow': 'pokeball-shadow 0.85s ease-in-out infinite',
        /* Pokédex device animations */
        'pdx-streak': 'pdxStreakSweep 9s ease-in-out infinite',
        'pdx-led-breathe': 'pdxLedBreathe 3s ease-in-out infinite',
        'pdx-boot-scan': 'pdxBootScan 1.2s ease-in-out forwards',
        'pdx-stat-fill': 'pdxStatFill 0.6s ease-out forwards',
        'pdx-caret': 'pdxCaret 1s step-end infinite',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.shadow-pokemon': {
          textShadow:
            '-1px -1px 0 #2a75bb, 1px -1px 0 #2a75bb, -1px 1px 0 #2a75bb, 1px 1px 0 #2a75bb',
        },
      });
    }),
  ],
};
