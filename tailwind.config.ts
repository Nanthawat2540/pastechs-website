import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#05050f',
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        purple: {
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
        },
        accent: '#ec4899',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb, #7c3aed)',
        'gradient-accent': 'linear-gradient(135deg, #7c3aed, #ec4899)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
