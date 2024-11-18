import type { Config } from "tailwindcss";
import { fontFamily } from'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        gray: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
          600: '#3d3d3d',
          500: '#4d4d4d',
          400: '#5d5d5d',
          300: '#6d6d6d',
          200: '#7d7d7d',
          100: '#8d8d8d',
        },
      },
    },
  },
  plugins: [],
};
export default config;
