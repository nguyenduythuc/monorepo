import * as React from 'react';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import { SVGProps } from '../../../types';

const BgInProgressApplication = ({ width = 389, height = 116, viewBox = "0 0 389 116" }: SVGProps) => (
  <Svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill="none"
  >
    <Rect
      x={0.382812}
      y={0.0761719}
      width={width}
      height={height}
      rx={16}
      fill="url(#paint0_linear_1_5)"
    />
    <Rect
      x={0.382812}
      y={0.0761719}
      width={width}
      height={height}
      rx={16}
      fill="white"
      fillOpacity={0.1}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1_5"
        x1={24.8477}
        y1={-92.6245}
        x2={209.976}
        y2={311.245}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F83D5C" />
        <Stop offset={1} stopColor="#FD4B2F" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default BgInProgressApplication;
