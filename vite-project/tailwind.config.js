module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
