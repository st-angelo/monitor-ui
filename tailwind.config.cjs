/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'teal-600': '#38d9a9',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
