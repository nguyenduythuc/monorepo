import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {SVGProps} from '../../../types';

const CloseIcon = ({size = 25, color = '#fff'}: SVGProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <G clipPath="url(#clip0_1473_5335)">
      <Path
        d="M14.1743 12.3654L21.9621 4.57739C22.4689 4.07081 22.4689 3.25174 21.9621 2.74517C21.4555 2.23859 20.6365 2.23859 20.1299 2.74517L12.3419 10.5332L4.55413 2.74517C4.04731 2.23859 3.22848 2.23859 2.72191 2.74517C2.21509 3.25174 2.21509 4.07081 2.72191 4.57739L10.5097 12.3654L2.72191 20.1534C2.21509 20.66 2.21509 21.479 2.72191 21.9856C2.97437 22.2383 3.30631 22.3652 3.63802 22.3652C3.96972 22.3652 4.30143 22.2383 4.55413 21.9856L12.3419 14.1976L20.1299 21.9856C20.3826 22.2383 20.7143 22.3652 21.046 22.3652C21.3777 22.3652 21.7094 22.2383 21.9621 21.9856C22.4689 21.479 22.4689 20.66 21.9621 20.1534L14.1743 12.3654Z"
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
export default CloseIcon;
