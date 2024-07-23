import colorTokens from './themes/colors';
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: colorTokens,
      fontSize: {
        'text-32px': '32px',
      },
      rounded: {
        'rounded-20px': '20px',
        'rounded-10px': '10px',
      },
    },
  },
  plugins: [],
};
