import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const OccupationIcon = ({ size = 21, color = '#E7252B' }: SVGProps) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"
    >
        <Path
            d="M16.6009 3.53841H15.6842C15.4908 2.59792 14.9791 1.75287 14.2353 1.14568C13.4915 0.538486 12.5611 0.20629 11.6009 0.205078L9.93424 0.205078C8.97407 0.20629 8.04368 0.538486 7.29987 1.14568C6.55606 1.75287 6.04432 2.59792 5.85091 3.53841H4.93424C3.82958 3.53973 2.77054 3.97915 1.98943 4.76026C1.20831 5.54138 0.768901 6.60042 0.767578 7.70508L0.767578 16.0384C0.768901 17.1431 1.20831 18.2021 1.98943 18.9832C2.77054 19.7643 3.82958 20.2038 4.93424 20.2051H16.6009C17.7056 20.2038 18.7646 19.7643 19.5457 18.9832C20.3268 18.2021 20.7663 17.1431 20.7676 16.0384V7.70508C20.7663 6.60042 20.3268 5.54138 19.5457 4.76026C18.7646 3.97915 17.7056 3.53973 16.6009 3.53841ZM9.93424 1.87174H11.6009C12.1161 1.87388 12.6181 2.03515 13.0382 2.33348C13.4582 2.63182 13.7758 3.05265 13.9476 3.53841H7.58758C7.75931 3.05265 8.07694 2.63182 8.497 2.33348C8.91705 2.03515 9.41903 1.87388 9.93424 1.87174ZM4.93424 5.20508H16.6009C17.264 5.20508 17.8998 5.46847 18.3687 5.93731C18.8375 6.40615 19.1009 7.04204 19.1009 7.70508V10.2051H2.43424V7.70508C2.43424 7.04204 2.69764 6.40615 3.16648 5.93731C3.63532 5.46847 4.2712 5.20508 4.93424 5.20508ZM16.6009 18.5384H4.93424C4.2712 18.5384 3.63532 18.275 3.16648 17.8062C2.69764 17.3373 2.43424 16.7015 2.43424 16.0384V11.8717H9.93424V12.7051C9.93424 12.9261 10.022 13.1381 10.1783 13.2943C10.3346 13.4506 10.5466 13.5384 10.7676 13.5384C10.9886 13.5384 11.2006 13.4506 11.3568 13.2943C11.5131 13.1381 11.6009 12.9261 11.6009 12.7051V11.8717H19.1009V16.0384C19.1009 16.7015 18.8375 17.3373 18.3687 17.8062C17.8998 18.275 17.264 18.5384 16.6009 18.5384Z"
            fill={color}
        />
    </Svg>
);
export default OccupationIcon;
