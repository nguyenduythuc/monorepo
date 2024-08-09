import * as React from 'react';
import Svg, {Defs, LinearGradient, Path, Rect, Stop} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const FastLoanIcon = ({
  width = 45,
  height = 45,
  color = '#E2F7FF',
}: SVGProps) => (
  <Svg width={width} height={height} viewBox="0 0 49 49" fill="none">
    <Rect
      x={0.921875}
      y={0.97168}
      width={48}
      height={48}
      rx={18}
      fill={color}
    />
    <Path
      d="M24.92 12.972a11.993 11.993 0 00-10.258 5.77 1 1 0 01-1.708-1.04 13.993 13.993 0 0111.967-6.73c7.732 0 14 6.268 14 14s-6.268 14-14 14a13.993 13.993 0 01-11.967-6.73 1 1 0 111.708-1.04 11.993 11.993 0 0010.259 5.77c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
      fill="url(#paint0_linear_1050_6107)"
    />
    <Path
      d="M13.922 20.972a1 1 0 01-1 1h-1.5a1 1 0 110-2h1.5a1 1 0 011 1z"
      fill="url(#paint1_linear_1050_6107)"
    />
    <Path
      d="M12.922 25.973a1 1 0 000-2h-3a1 1 0 100 2h3z"
      fill="url(#paint2_linear_1050_6107)"
    />
    <Path
      d="M13.922 28.972a1 1 0 01-1 1h-1.5a1 1 0 110-2h1.5a1 1 0 011 1z"
      fill="url(#paint3_linear_1050_6107)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.424 24.972c0 5.799-4.7 10.5-10.5 10.5s-10.5-4.701-10.5-10.5c0-5.8 4.7-10.5 10.5-10.5s10.5 4.7 10.5 10.5zm-10.5-7.5a1 1 0 011 1V19h2.5a1 1 0 110 2h-4.472c-.86 0-1.528.68-1.528 1.485s.668 1.486 1.528 1.486h1.944c1.932 0 3.528 1.544 3.528 3.485 0 1.931-1.58 3.47-3.5 3.485v.53a1 1 0 11-2 0v-.53h-2.5a1 1 0 110-2h4.472c.86 0 1.528-.68 1.528-1.485 0-.804-.668-1.485-1.528-1.485h-1.944c-1.933 0-3.528-1.545-3.528-3.486 0-1.931 1.58-3.47 3.5-3.485v-.53a1 1 0 011-1z"
      fill="url(#paint4_linear_1050_6107)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1050_6107"
        x1={32.6065}
        y1={35.7959}
        x2={12.1694}
        y2={21.2886}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#2AADF1" />
        <Stop offset={0.52} stopColor="#39A4F0" />
        <Stop offset={1} stopColor="#99EEFC" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1050_6107"
        x1={32.6065}
        y1={35.7959}
        x2={12.1694}
        y2={21.2886}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#2AADF1" />
        <Stop offset={0.52} stopColor="#39A4F0" />
        <Stop offset={1} stopColor="#99EEFC" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1050_6107"
        x1={32.6065}
        y1={35.7959}
        x2={12.1694}
        y2={21.2886}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#2AADF1" />
        <Stop offset={0.52} stopColor="#39A4F0" />
        <Stop offset={1} stopColor="#99EEFC" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_1050_6107"
        x1={32.6065}
        y1={35.7959}
        x2={12.1694}
        y2={21.2886}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#2AADF1" />
        <Stop offset={0.52} stopColor="#39A4F0" />
        <Stop offset={1} stopColor="#99EEFC" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_1050_6107"
        x1={32.6065}
        y1={35.7959}
        x2={12.1694}
        y2={21.2886}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#2AADF1" />
        <Stop offset={0.52} stopColor="#39A4F0" />
        <Stop offset={1} stopColor="#99EEFC" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default FastLoanIcon;
