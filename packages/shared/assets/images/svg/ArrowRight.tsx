import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@lfvn-customer/shared/types';

const ArrowRight = ({
  size = 25,
  color = '#E7252B',
}: SVGProps) => (
  <Svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
  >
    <Path
      d="M13.3444 7.62207L18.8828 13.0766L13.3444 18.5312M18.1136 13.0766L6.88281 13.0766"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowRight;
