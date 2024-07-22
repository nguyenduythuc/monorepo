import genColorMapToken from './ColorMapToken';

const seedToken = {
  light: {
    primary: '#00BC3C',
    secondary: '#2F6BFF',
    tertiary: '#F58220',
    quaternary: '#000000',
    brand: '#E7252B',
  },
  dark: {
    primary: '#000000',
    secondary: '#2F6BFF',
    tertiary: '#F58220',
    quaternary: '#000000',
    brand: '#E7252B',
  }
};

const themeTokens = genColorMapToken(seedToken);

export type BaseColorType = typeof seedToken;
export default themeTokens;
