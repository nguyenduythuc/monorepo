import {ColorProps} from '../../types/themeTypes';
import genColorMapToken from './ColorMapToken';

const seedToken = {
  light: {
    negative: '#000000',
    useful: '#2F6BFF',
    positive: '#00BC3C',
    careful: '#F58220',
    danger: '#E7252B',
  },
  dark: {
    negative: '#000000',
    useful: '#2F6BFF',
    positive: '#00BC3C',
    careful: '#F58220',
    danger: '#E7252B',
  },
};

const themeTokens: ColorProps = genColorMapToken(seedToken);

export type BaseColorType = typeof seedToken;
export default themeTokens;
