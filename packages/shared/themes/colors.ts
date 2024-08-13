import themeTokens from './token-generator';

export const themeStyles = {
  light: {
    background: 'bg-light-background',
    buttonPrimary: 'bg-dark-primary',
    textNegative500: 'text-light-negative-500',
    textNegative400: 'text-light-negative-400',
    textNegative300: 'text-light-negative-300',
    textUseful500: 'text-light-useful-500',
    textDanger500: 'text-light-danger-500',
    borderNegative100: 'border-light-negative-100',
    borderUseful500: 'border-light-useful-500',
    useful500: 'light-useful-500',
    bgDanger500: 'bg-light-danger-500',
    bgUseful500: 'bg-light-useful-500',
    borderDanger500: 'border-light-danger-500',
    primary: 'text-light-primary',
  },
  dark: {
    background: 'bg-dark-background',
    buttonPrimary: 'bg-dark-primary',
    textNegative500: 'text-dark-negative-500',
    textNegative400: 'text-dark-negative-400',
    textNegative300: 'text-dark-negative-300',
    textUseful500: 'text-dark-useful-500',
    textDanger500: 'text-dark-danger-500',
    borderNegative100: 'border-dark-negative-100',
    borderUseful500: 'border-dark-useful-500',
    useful500: 'dark-useful-500',
    bgDanger500: 'bg-dark-danger-500',
    bgUseful500: 'bg-dark-useful-500',
    borderDanger500: 'border-dark-danger-500',
    primary: 'text-dark-primary',
  },
};

export const fontStyles = {
  appFontRegular: 'appFontRegular',
  appFontBold: 'appFontBold',
  appFontSemibold: 'appFontSemibold',
  appFontMedium: 'appFontMedium',
};

export default themeTokens;
