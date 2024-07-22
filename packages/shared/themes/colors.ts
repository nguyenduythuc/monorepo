import themeTokens from './token-generator';

const colorTokens = {
  light: themeTokens,
  dark: themeTokens,
}
export const themeStyles = {
  light: {
    background: 'bg-light-background',
    buttonPrimary: 'bg-dark-primary',
    text: 'text-light-text',
    primary: 'text-light-primary',
  },
  dark: {
    background: 'bg-dark-background',
    buttonPrimary: 'bg-light-primary',
    text: 'text-dark-text',
    primary: 'text-dark-primary',
  },
};

export default colorTokens;