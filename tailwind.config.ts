import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00C5DC',
          'cyan-dark': '#00A8BC',
          blue: '#4A4FCC',
          'blue-dark': '#3538A8',
          teal: '#2E8899',
          green: '#52BD4A',
          'green-dark': '#3E9638',
          navy: '#1a1f36',
          'navy-light': '#2d3452',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
