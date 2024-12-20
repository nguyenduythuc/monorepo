import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const FlashIcon = ({width = 16, height = 26, color = 'white'}: SVGProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 26" fill="none">
    <Path
      d="M5.34615 25.7799C5.68516 25.9248 6.07933 25.8038 6.27734 25.4911L15.2869 11.1759C15.4328 10.9442 15.4416 10.6517 15.3096 10.4127C15.1776 10.1729 14.9254 10.024 14.6519 10.024H8.63894L10.8752 1.1492C10.9654 0.790671 10.7828 0.420379 10.4433 0.274474C10.1061 0.129321 9.70942 0.250999 9.51216 0.56333L0.502627 14.8785C0.356722 15.1102 0.347913 15.4027 0.479902 15.6417C0.611892 15.8815 0.864109 16.0304 1.1376 16.0304H7.15056L4.9143 24.9052C4.8241 25.2638 5.00664 25.634 5.34615 25.7799Z"
      fill={color}
    />
  </Svg>
);
export default FlashIcon;
