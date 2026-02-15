/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ms-obsidian': '#0B1221', // Deep Navy Background (Microsoft Style)
        'ms-blue': '#00A4EF', // Microsoft Blue
        'ms-violet': '#7F00FF', // Electric Violet
        'ms-purple': '#7F00FF', // Sync with violet
        'ms-white': '#F0F4F8', // Cool White
        'ms-dim': '#888888', // Dimmed Grey
        'ms-dark': '#0f172a',
        'ms-neon': '#00eaff',
        'ms-yellow': '#ffb900',
        'ms-orange': '#f25022',
        'ms-green': '#7fba00',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Inter"', '"Manrope"', 'sans-serif'],
        'script': ['"Reenie Beanie"', '"Nothing You Could Do"', 'cursive'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
      },
      animation: {
        'ticker': 'ticker 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-short': 'bounce-short 0.5s ease-out',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'bounce-short': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        }
      },
      boxShadow: {
        'icon-blue': '4px 4px 0 0 rgba(0, 164, 239, 0.85)',
        'icon-green': '4px 4px 0 0 rgba(34, 197, 94, 0.85)',
        'icon-orange': '4px 4px 0 0 rgba(249, 115, 22, 0.85)',
        'icon-violet': '4px 4px 0 0 rgba(127, 0, 255, 0.85)',
        'icon-neon': '4px 4px 0 0 rgba(0, 234, 255, 0.85)',
        'icon-purple': '4px 4px 0 0 rgba(168, 85, 247, 0.85)',
      }
    },
  },
  plugins: [],
}
