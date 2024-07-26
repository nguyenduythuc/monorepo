import themeTokens from './token-generator';

export const themeStyles = {
  light: {
    background: 'bg-light-background',
    buttonPrimary: 'bg-dark-primary',
    textNegative500: 'text-light-negative-500',
    textNegative300: 'text-light-negative-300',
    textUseful500: 'text-light-useful-500',
    borderNegative100: 'border-light-negative-100',
    borderUseful500: 'border-light-useful-500',
    useful500: 'light-useful-500',
    primary: 'text-light-primary',
  },
  dark: {
    background: 'bg-dark-background',
    buttonPrimary: 'bg-dark-primary',
    textNegative500: 'text-dark-negative-500',
    textNegative300: 'text-light-negative-300',
    textUseful500: 'text-dark-useful-500',
    borderNegative100: 'border-dark-negative-100',
    borderUseful500: 'border-dark-useful-500',
    useful500: 'dark-useful-500',
    primary: 'text-dark-primary',
  },
};

export default themeTokens;
