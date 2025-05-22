module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    'bg-red-100', 'bg-yellow-100', 'bg-sky-600', 'bg-white',
    'text-red-500', 'text-3xl', 'font-bold'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
