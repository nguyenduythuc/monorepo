import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const ArrowDown = ({width = 17, height = 10, color = '#999999'}: SVGProps) => (
  <Svg width={width} height={height} viewBox="0 0 17 10" fill="none">
    <Path
      d="M1.9303 0.0205087L0.5 1.38555L8.5 9.02051L16.5 1.38555L15.0697 0.0205081L8.5 6.29043L1.9303 0.0205087Z"
      fill={color}
    />
  </Svg>
);
export default ArrowDown;
