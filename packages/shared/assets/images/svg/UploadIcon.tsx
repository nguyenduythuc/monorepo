import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const UploadIcon = ({ size = 33, color = '#2F6BFF' }: SVGProps) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 33 33"
        fill="none"
    >
        <Path
            d="M8.92839 26.7118C8.19505 26.7118 7.5675 26.4509 7.04572 25.9291C6.52305 25.4064 6.26172 24.7784 6.26172 24.0451V20.0451H8.92839V24.0451H24.9284V20.0451H27.5951V24.0451C27.5951 24.7784 27.3342 25.4064 26.8124 25.9291C26.2897 26.4509 25.6617 26.7118 24.9284 26.7118H8.92839ZM15.5951 21.3784V10.5118L12.1284 13.9784L10.2617 12.0451L16.9284 5.37842L23.5951 12.0451L21.7284 13.9784L18.2617 10.5118V21.3784H15.5951Z"
            fill={color}
        />
    </Svg>
);
export default UploadIcon;
