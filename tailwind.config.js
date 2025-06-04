/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#717171',
        header: '#333333',
        button: '#7D7D7D',
      },
    },
  },
  plugins: [],
};