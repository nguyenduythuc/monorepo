import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {SVGProps} from '../../../types';

const ArrowLeft = ({size = 25, color = '#fff'}: SVGProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <G clipPath="url(#clip0_1473_5335)">
      <Path
        d="M18.177 4.56075C18.7073 4.03045 18.7073 3.17067 18.177 2.64037C17.6467 2.11007 16.7869 2.11007 16.2566 2.64037L7.07429 11.8227C6.68377 12.2132 6.68377 12.8464 7.07429 13.2369L16.2566 22.4192C16.7869 22.9495 17.6467 22.9495 18.177 22.4192C18.7073 21.8889 18.7073 21.0291 18.177 20.4988L10.208 12.5298L18.177 4.56075Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1473_5335">
        <Rect
          width={size - 1}
          height={size - 1}
          fill={color}
          transform="translate(0.753906 0.529785)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowLeft;
