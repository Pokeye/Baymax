import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 36px rgba(34, 211, 238, 0.16)',
      },
    },
  },
  plugins: [],
} satisfies Config
