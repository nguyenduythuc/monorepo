import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@lfvn-customer/shared/types';

const ChevronRight = ({
  width = 9,
  height = 17,
  color = '#fff',
  transform = false,
}: SVGProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 9 17"
    fill="none"
    style={{ transform: [{ rotate: transform ? '180deg' : '0deg' }] }}>
    <Path
      d="M0.756926 0.943126C0.848321 0.844916 0.956894 0.766997 1.07643 0.713832C1.19596 0.660667 1.32411 0.633301 1.45353 0.633301C1.58294 0.633301 1.71109 0.660667 1.83062 0.713832C1.95016 0.766997 2.05873 0.844916 2.15013 0.943126L5.45997 4.49076L8.76981 8.0384C8.84278 8.11645 8.90067 8.20916 8.94017 8.31122C8.97967 8.41328 9 8.52269 9 8.63319C9 8.74368 8.97967 8.85309 8.94017 8.95515C8.90067 9.05722 8.84278 9.14993 8.76981 9.22798L2.15013 16.3233C1.76444 16.7367 1.14261 16.7367 0.756926 16.3233C0.371236 15.9099 0.371236 15.2434 0.756926 14.83L6.53439 8.63741L0.749054 2.43642C0.371236 2.02303 0.371236 1.35652 0.756926 0.943126Z"
      fill={color}
    />
  </Svg>
);
export default ChevronRight;
