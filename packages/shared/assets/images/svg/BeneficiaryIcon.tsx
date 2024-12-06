import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const BeneficiaryIcon = ({
  height = 21,
  width = 19,
  color = '#E7252B',
}: SVGProps) => (
  <Svg width={width} height={height} viewBox="0 0 19 21" fill="none">
    <Path
      d="M8.09961 0.205078C5.34211 0.205078 3.09961 2.44758 3.09961 5.20508C3.09961 7.96258 5.34211 10.2051 8.09961 10.2051C10.8571 10.2051 13.0996 7.96258 13.0996 5.20508C13.0996 2.44758 10.8571 0.205078 8.09961 0.205078ZM8.09961 8.53841C6.26128 8.53841 4.76628 7.04341 4.76628 5.20508C4.76628 3.36674 6.26128 1.87174 8.09961 1.87174C9.93794 1.87174 11.4329 3.36674 11.4329 5.20508C11.4329 7.04341 9.93794 8.53841 8.09961 8.53841ZM10.5738 13.1226C10.4588 13.5692 10.0013 13.8367 9.55878 13.7217C9.08544 13.6001 8.59378 13.5384 8.09961 13.5384C4.88378 13.5384 2.26628 16.1551 2.26628 19.3717C2.26628 19.8317 1.89378 20.2051 1.43294 20.2051C0.972109 20.2051 0.599609 19.8317 0.599609 19.3717C0.599609 15.2367 3.96378 11.8717 8.09961 11.8717C8.73378 11.8717 9.36461 11.9509 9.97378 12.1084C10.4196 12.2226 10.6879 12.6776 10.5738 13.1226ZM18.9329 16.0384C18.9329 17.4167 17.8113 18.5384 16.4329 18.5384V19.3717C16.4329 19.8317 16.0604 20.2051 15.5996 20.2051C15.1388 20.2051 14.7663 19.8317 14.7663 19.3717V18.5367H14.5413C13.6529 18.5367 12.8238 18.0584 12.3779 17.2901C12.1471 16.8917 12.2829 16.3817 12.6813 16.1509C13.0796 15.9209 13.5896 16.0559 13.8196 16.4542C13.9688 16.7109 14.2446 16.8701 14.5413 16.8701L16.4329 16.8717C16.8921 16.8717 17.2654 16.4976 17.2654 16.0384C17.2654 15.7234 17.0396 15.4567 16.7288 15.4051L14.1946 14.9826C13.0763 14.7967 12.2654 13.8384 12.2654 12.7051C12.2654 11.3267 13.3871 10.2051 14.7654 10.2051V9.37174C14.7654 8.91175 15.1379 8.53841 15.5988 8.53841C16.0596 8.53841 16.4321 8.91175 16.4321 9.37174V10.2076H16.6579C17.5438 10.2076 18.3729 10.6851 18.8196 11.4534C19.0513 11.8509 18.9163 12.3609 18.5188 12.5926C18.1204 12.8242 17.6096 12.6884 17.3796 12.2909C17.2271 12.0309 16.9579 11.8742 16.6579 11.8742L14.7654 11.8717C14.3063 11.8717 13.9329 12.2459 13.9329 12.7051C13.9329 13.0201 14.1588 13.2867 14.4696 13.3384L17.0038 13.7609C18.1221 13.9467 18.9329 14.9051 18.9329 16.0384Z"
      fill={color}
    />
  </Svg>
);
export default BeneficiaryIcon;
