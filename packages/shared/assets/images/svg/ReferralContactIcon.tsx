import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const ReferralContactIcon = ({ size = 21, color = '#E7252B' }: SVGProps) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"

    >
        <Path
            d="M7.01758 11.0384C6.2759 11.0384 5.55087 10.8185 4.93419 10.4064C4.3175 9.99437 3.83686 9.4087 3.55303 8.72348C3.2692 8.03825 3.19494 7.28425 3.33963 6.55682C3.48433 5.8294 3.84148 5.16121 4.36593 4.63676C4.89037 4.11232 5.55856 3.75516 6.28599 3.61047C7.01342 3.46577 7.76742 3.54004 8.45264 3.82386C9.13786 4.10769 9.72353 4.58834 10.1356 5.20502C10.5476 5.82171 10.7676 6.54673 10.7676 7.28841C10.7665 8.28264 10.371 9.23582 9.66801 9.93884C8.96499 10.6419 8.0118 11.0373 7.01758 11.0384ZM7.01758 5.20508C6.60553 5.20508 6.20274 5.32726 5.86014 5.55618C5.51754 5.7851 5.25051 6.11048 5.09283 6.49116C4.93515 6.87183 4.89389 7.29072 4.97427 7.69485C5.05466 8.09898 5.25308 8.47019 5.54444 8.76155C5.8358 9.05291 6.20701 9.25133 6.61114 9.33171C7.01527 9.4121 7.43416 9.37084 7.81484 9.21316C8.19551 9.05548 8.52089 8.78845 8.74981 8.44585C8.97873 8.10325 9.10091 7.70046 9.10091 7.28841C9.10091 6.73588 8.88142 6.20597 8.49072 5.81527C8.10002 5.42457 7.57011 5.20508 7.01758 5.20508ZM13.2676 19.3717V18.9551C13.2676 17.2975 12.6091 15.7078 11.437 14.5357C10.2649 13.3636 8.67518 12.7051 7.01758 12.7051C5.35997 12.7051 3.77026 13.3636 2.59816 14.5357C1.42606 15.7078 0.767578 17.2975 0.767578 18.9551L0.767578 19.3717C0.767578 19.5928 0.855375 19.8047 1.01166 19.961C1.16794 20.1173 1.3799 20.2051 1.60091 20.2051C1.82193 20.2051 2.03389 20.1173 2.19017 19.961C2.34645 19.8047 2.43424 19.5928 2.43424 19.3717V18.9551C2.43424 17.7395 2.91713 16.5737 3.77667 15.7142C4.63621 14.8546 5.802 14.3717 7.01758 14.3717C8.23315 14.3717 9.39894 14.8546 10.2585 15.7142C11.118 16.5737 11.6009 17.7395 11.6009 18.9551V19.3717C11.6009 19.5928 11.6887 19.8047 11.845 19.961C12.0013 20.1173 12.2132 20.2051 12.4342 20.2051C12.6553 20.2051 12.8672 20.1173 13.0235 19.961C13.1798 19.8047 13.2676 19.5928 13.2676 19.3717ZM20.7676 15.2051C20.7675 14.079 20.4416 12.977 19.829 12.032C19.2164 11.0871 18.3435 10.3397 17.3154 9.88005C16.2874 9.42037 15.1484 9.26807 14.0357 9.44153C12.923 9.61499 11.8844 10.1068 11.0451 10.8576C10.9624 10.9302 10.8949 11.0186 10.8465 11.1175C10.7982 11.2164 10.7699 11.3239 10.7633 11.4337C10.7567 11.5436 10.772 11.6537 10.8082 11.7577C10.8444 11.8617 10.9009 11.9574 10.9743 12.0394C11.0477 12.1214 11.1367 12.1881 11.236 12.2355C11.3354 12.283 11.4431 12.3103 11.553 12.3158C11.663 12.3214 11.7729 12.3051 11.8766 12.2679C11.9802 12.2308 12.0754 12.1734 12.1567 12.0992C12.7563 11.5631 13.4982 11.2119 14.2929 11.0881C15.0876 10.9643 15.9012 11.0732 16.6354 11.4016C17.3696 11.73 17.9931 12.2638 18.4306 12.9387C18.8681 13.6137 19.1009 14.4008 19.1009 15.2051C19.1009 15.4261 19.1887 15.6381 19.345 15.7943C19.5013 15.9506 19.7132 16.0384 19.9342 16.0384C20.1553 16.0384 20.3672 15.9506 20.5235 15.7943C20.6798 15.6381 20.7676 15.4261 20.7676 15.2051ZM15.3509 7.70508C14.6092 7.70508 13.8842 7.48515 13.2675 7.07309C12.6508 6.66104 12.1702 6.07537 11.8864 5.39014C11.6025 4.70492 11.5283 3.95092 11.673 3.22349C11.8177 2.49606 12.1748 1.82788 12.6993 1.30343C13.2237 0.778982 13.8919 0.42183 14.6193 0.277135C15.3468 0.13244 16.1007 0.206703 16.786 0.490532C17.4712 0.77436 18.0569 1.25501 18.4689 1.87169C18.881 2.48838 19.1009 3.2134 19.1009 3.95508C19.0998 4.9493 18.7044 5.90249 18.0013 6.60551C17.2983 7.30853 16.3451 7.70398 15.3509 7.70508ZM15.3509 1.87175C14.9389 1.87175 14.5361 1.99393 14.1935 2.22285C13.8509 2.45177 13.5838 2.77714 13.4262 3.15782C13.2685 3.5385 13.2272 3.95739 13.3076 4.36152C13.388 4.76564 13.5864 5.13686 13.8778 5.42822C14.1691 5.71958 14.5403 5.918 14.9445 5.99838C15.3486 6.07877 15.7675 6.03751 16.1482 5.87983C16.5288 5.72215 16.8542 5.45512 17.0831 5.11252C17.3121 4.76991 17.4342 4.36712 17.4342 3.95508C17.4342 3.40254 17.2148 2.87264 16.824 2.48194C16.4333 2.09124 15.9034 1.87175 15.3509 1.87175Z"
            fill={color}
        />
    </Svg>
);
export default ReferralContactIcon;
