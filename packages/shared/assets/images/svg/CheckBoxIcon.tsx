import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const CheckboxIcon = ({width = 20, height = 21, color = '#000'}: SVGProps) => (
  <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
    <Rect
      x="2.10742"
      y="1.99982"
      width="20"
      height="20"
      rx="10"
      fill="#2F6BFF"
    />
    <Path
      d="M10.0541 15.521L7.32909 12.7117C7.25881 12.6393 7.20306 12.5533 7.16503 12.4586C7.127 12.364 7.10742 12.2625 7.10742 12.1601C7.10742 12.0576 7.127 11.9562 7.16503 11.8615C7.20306 11.7668 7.25881 11.6808 7.32909 11.6084C7.39936 11.5359 7.48279 11.4785 7.57461 11.4393C7.66643 11.4001 7.76484 11.3799 7.86423 11.3799C7.96361 11.3799 8.06203 11.4001 8.15385 11.4393C8.24567 11.4785 8.3291 11.5359 8.39937 11.6084L10.5931 13.862L15.8155 8.47833C15.9574 8.33201 16.1499 8.24982 16.3506 8.24982C16.5513 8.24982 16.7438 8.33201 16.8858 8.47833C17.0277 8.62464 17.1074 8.82308 17.1074 9.03C17.1074 9.23692 17.0277 9.43536 16.8858 9.58168L11.1244 15.521C11.0542 15.5935 10.9708 15.6511 10.879 15.6903C10.7871 15.7296 10.6887 15.7498 10.5893 15.7498C10.4899 15.7498 10.3914 15.7296 10.2996 15.6903C10.2078 15.6511 10.1244 15.5935 10.0541 15.521Z"
      fill="white"
    />
  </Svg>
);
export default CheckboxIcon;
