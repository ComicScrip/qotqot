module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-sm": "src('/../public/assets/qotqot-bg.png')",
      },
    },
  },
  plugins: [],
};
