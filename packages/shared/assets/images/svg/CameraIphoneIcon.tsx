import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const CameraIphoneIcon = ({
  width = 79,
  height = 79,
  color = 'white',
}: SVGProps) => (
  <Svg width={width} height={height} viewBox="0 0 79 79" fill="none">
    <Circle cx={39.5} cy={39.5} r={39} fill={color} />
    <Circle
      cx={39.498}
      cy={39.5}
      r={33.998}
      fill={color}
      stroke="black"
      strokeWidth={2}
    />
  </Svg>
);
export default CameraIphoneIcon;
