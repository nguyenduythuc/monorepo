import colorTokens from './themes/colors';
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: colorTokens.light,
        dark: colorTokens.dark,
      },
    },
  },
  plugins: [],
};
