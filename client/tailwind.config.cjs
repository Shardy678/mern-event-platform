/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
  ],
  theme: {
    extend: {
      boxShadow: {
        "weird": "3px 4px"
      }
    },
  },
  plugins: [],
}

