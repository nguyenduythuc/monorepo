import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const UploadCircleIcon = ({ size = 27, color = '#2F6BFF' }: SVGProps) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 27 27"
        fill="none"
    >
        <Path
            d="M8.41992 12.6351L13.4199 7.67383L18.4199 12.6351M13.4199 8.3632V18.4238"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M25.4121 13.0449C25.4121 6.41992 20.0371 1.04492 13.4121 1.04492C6.78711 1.04492 1.41211 6.41992 1.41211 13.0449C1.41211 19.6699 6.78711 25.0449 13.4121 25.0449C20.0371 25.0449 25.4121 19.6699 25.4121 13.0449Z"
            stroke={color}
            strokeWidth={2}
            strokeMiterlimit={10}
        />
    </Svg>
);
export default UploadCircleIcon;
