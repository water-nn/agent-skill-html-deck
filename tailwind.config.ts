import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: '#050812',
        nebula: '#0b1024',
        cyanGlow: '#38f8ff',
        violetGlow: '#8b5cf6',
        aurora: '#27f5a7',
      },
      boxShadow: {
        glow: '0 0 45px rgba(56, 248, 255, 0.22)',
        panel: '0 28px 90px rgba(0, 0, 0, 0.42)',
      },
    },
  },
  plugins: [],
} satisfies Config
