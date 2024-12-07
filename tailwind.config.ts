import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      backgroundImage: {},
      colors: {
        bgDark: '#0f172a',
        textColor: 'var(--textColor)',
        paper: "#f4f0e8",
        purple: {
          90: '#201122',
        },
        slate: {
          200: 'rgb(226 232 240/var(--tw-text-opacity))',
          400: 'rgb(148 163 184 / <alpha-value>)',
        },
      },
      spacing: {},
    },
  },
  plugins: [],
};
export default config;
