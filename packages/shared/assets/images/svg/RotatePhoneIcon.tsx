import * as React from 'react';
import Svg, {G, Path, Mask} from 'react-native-svg';
import {SVGProps} from '../../../types';

const RotatePhoneIcon = ({size = 31, color = '#fff'}: SVGProps) => (
  <Svg width={size} height={size} viewBox="0 0 31 31" fill="none">
    <Mask
      id="mask0_3021_16995"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={size}
      height={size}>
      <Path d="M0.341797 0.5H30.3418V30.5H0.341797V0.5Z" fill={color} />
    </Mask>
    <G mask="url(#mask0_3021_16995)">
      <Path
        d="M20.9437 3.65C25.0312 5.5875 27.9562 9.55 28.4063 14.25H30.2813C29.6438 6.55 23.2062 0.5 15.3437 0.5L14.5187 0.5375L19.2812 5.3L20.9437 3.65ZM13.1312 2.6875C12.3938 1.95 11.2063 1.95 10.4813 2.6875L2.53125 10.6375C1.79375 11.375 1.79375 12.5625 2.53125 13.2875L17.5562 28.3125C18.2937 29.05 19.4812 29.05 20.2062 28.3125L28.1562 20.3625C28.8937 19.625 28.8937 18.4375 28.1562 17.7125L13.1312 2.6875ZM18.8812 26.9875L3.85625 11.9625L11.8063 4.0125L26.8313 19.0375L18.8812 26.9875ZM9.74375 27.35C5.65625 25.425 2.73125 21.45 2.28125 16.75H0.40625C1.04375 24.45 7.48125 30.5 15.3437 30.5L16.1687 30.4625L11.4063 25.7L9.74375 27.35Z"
        fill={color}
      />
    </G>
  </Svg>
);
export default RotatePhoneIcon;
