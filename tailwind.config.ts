import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        manrope: ['var(--font-manrope)'],
        montserrat: ['var(--font-montserrat)'],
        satoshi: ['var(--font-satoshi)'],
      },
      backgroundImage: {},
      colors: {
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
