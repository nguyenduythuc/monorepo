import * as React from 'react';
import Svg, {Rect, Circle} from 'react-native-svg';
import {SVGProps} from '../../../types';

const SmartPhoneIcon = ({size = 25, color = '#E7252B'}: SVGProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Rect
      x={6.35156}
      y={2.7207}
      width={13.0039}
      height={19}
      rx={3.5}
      stroke={color}
    />
    <Circle cx={12.8555} cy={18.1299} r={1.5} stroke={color} />
  </Svg>
);
export default SmartPhoneIcon;
