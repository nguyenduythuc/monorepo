import { TinyColor } from '@ctrl/tinycolor';
import { BaseColorType } from '.';

export const generateColorPalettes = (baseColor: string, prefix: string) => {
  const colors: { [key: string]: string } = {};
  colors[`${prefix}-500`] = baseColor

  colors[`${prefix}-400`] = new TinyColor(baseColor).brighten(20).toRgbString();
  colors[`${prefix}-300`] = new TinyColor(baseColor).brighten(40).toRgbString();
  colors[`${prefix}-200`] = new TinyColor(baseColor).brighten(60).toRgbString();
  colors[`${prefix}-100`] = new TinyColor(baseColor).brighten(80).toRgbString();

  return colors;
};

const genColorMapToken = (seed: BaseColorType) => {
  const themeColor = Object.keys(seed).reduce((result, key) => {
    const color = Object.keys(seed[key]).reduce((colorResult, key2) => {
      return { ...colorResult, ...generateColorPalettes(seed[key][key2], key2) };
    }, {});
    return { ...result, [key]: color };
  }, {});

  return themeColor;
};

export default genColorMapToken;
