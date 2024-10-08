import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const FolderIcon = ({ width = 29, height = 24, size = 29, color = '#2F6BFF' }: SVGProps) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 29 24"
        fill="none"
    >
        <Path
            d="M1.61891 23.448C0.693125 22.9605 0.119141 22.0043 0.119141 20.9512V2.10742C0.119141 1.12305 0.909141 0.326172 1.87813 0.326172H8.52524C9.07453 0.326172 9.59606 0.563672 9.9602 0.979297L12.648 4.05117C12.6604 4.0668 12.6789 4.07305 12.6974 4.07305H22.4305C23.4025 4.07305 24.1895 4.87305 24.1895 5.8543V10.0105H6.80019C6.69836 10.0105 6.60887 10.0762 6.57492 10.1699L2.48297 21.5637C2.43359 21.7043 2.51691 21.8074 2.57246 21.848L1.61891 23.448ZM1.9707 2.20117V17.5043L4.83445 9.53242C5.13379 8.69805 5.92379 8.13867 6.80019 8.13867H22.3379V5.95117H12.6974C12.1481 5.95117 11.6266 5.71367 11.2625 5.29805L8.57461 2.22617C8.56227 2.21055 8.54375 2.2043 8.52524 2.2043H1.9707V2.20117Z"
            fill={color}
        />
        <Path
            d="M22.4444 23.7637H2.70675C2.27472 23.7637 1.86429 23.6324 1.51249 23.3855C0.734837 22.8355 0.416985 21.823 0.741009 20.9199L4.82988 9.53242C5.12921 8.69805 5.91921 8.13867 6.79562 8.13867H26.7802C27.4776 8.13867 28.0516 8.41367 28.3972 8.91055C28.7428 9.41055 28.8014 10.0543 28.5607 10.7262L24.4132 22.3668C24.1108 23.2043 23.3208 23.7637 22.4444 23.7637ZM6.7987 10.0137C6.69687 10.0137 6.60738 10.0793 6.57343 10.173L2.48148 21.5637C2.4321 21.7043 2.51542 21.8074 2.57097 21.848C2.61109 21.8762 2.65429 21.8887 2.70675 21.8887H22.4444C22.5462 21.8887 22.6357 21.823 22.6697 21.7293L26.8172 10.0887C26.8264 10.0605 26.8326 10.0387 26.8388 10.0168C26.8203 10.0168 26.8018 10.0137 26.7771 10.0137H6.7987Z"
            fill={color}
        />
    </Svg>
);
export default FolderIcon;
