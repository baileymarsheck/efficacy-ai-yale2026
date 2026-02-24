import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF8E8',
          100: '#FAF0D1',
          200: '#F5E1A3',
          300: '#E8C96E',
          400: '#DDB95A',
          500: '#D4A84B',
          600: '#C49A3D',
          700: '#A67F2E',
          800: '#876520',
          900: '#684C18',
        },
      },
    },
  },
  plugins: [],
}
export default config
