import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const UndoIcon = ({ width = 17, height = 17, color = '#2F6BFF' }: SVGProps) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 17 17"
        fill="none"
    >
        <Path
            d="M1.83211 8.35061C2.33817 8.35061 2.74889 8.73066 2.82223 9.23072C3.24961 12.1237 5.74858 14.3513 8.75827 14.3513C12.4094 14.3513 15.3104 11.0729 14.6703 7.30449C14.3683 5.52761 13.2381 3.95542 11.6546 3.09532C9.31701 1.8265 6.66736 2.25989 4.86714 3.79207L5.62056 4.54549C6.04061 4.96554 5.74325 5.68363 5.14917 5.68363H2.09148C1.72343 5.68363 1.42473 5.38492 1.42473 5.01688V1.95918C1.42473 1.36511 2.14282 1.06775 2.56287 1.4878L3.45097 2.3759C5.82525 0.272984 9.37301 -0.362425 12.5174 1.28844C14.731 2.45058 16.2938 4.64017 16.6665 7.11246C17.4146 12.0711 13.5775 16.3516 8.75894 16.3516C4.74446 16.3516 1.41073 13.3799 0.843328 9.52008C0.753318 8.90668 1.21204 8.35061 1.83211 8.35061Z"
            fill={color}
        />
    </Svg>
);
export default UndoIcon;
