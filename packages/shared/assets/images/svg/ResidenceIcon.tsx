import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const ResidenceIcon = ({ size = 21, color = '#E7252B' }: SVGProps) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"
    >
        <Path
            d="M18.9317 4.83944L13.0984 0.902774C11.6826 -0.0522266 9.85258 -0.0522266 8.43674 0.902774L2.60341 4.83944C1.45341 5.61611 0.767578 6.90694 0.767578 8.29444V16.0569C0.767578 18.3544 2.63674 20.2236 4.93424 20.2236H16.6009C18.8984 20.2236 20.7676 18.3544 20.7676 16.0569V8.29444C20.7676 6.90777 20.0817 5.61611 18.9317 4.83944ZM7.43424 18.5569C7.43424 16.7186 8.92924 15.2236 10.7676 15.2236C12.6059 15.2236 14.1009 16.7186 14.1009 18.5569H7.43424ZM19.1009 16.0569C19.1009 17.4353 17.9792 18.5569 16.6009 18.5569H15.7676C15.7676 15.7994 13.5251 13.5569 10.7676 13.5569C8.01008 13.5569 5.76758 15.7994 5.76758 18.5569H4.93424C3.55591 18.5569 2.43424 17.4353 2.43424 16.0569V8.29444C2.43424 7.46194 2.84591 6.68694 3.53591 6.22194L9.36924 2.28527C9.79424 1.99861 10.2809 1.85527 10.7676 1.85527C11.2542 1.85527 11.7409 1.99861 12.1659 2.28527L17.9992 6.22194C18.6892 6.68777 19.1009 7.46194 19.1009 8.29444V16.0569ZM10.7676 6.05694C8.92924 6.05694 7.43424 7.55194 7.43424 9.39028C7.43424 11.2286 8.92924 12.7236 10.7676 12.7236C12.6059 12.7236 14.1009 11.2286 14.1009 9.39028C14.1009 7.55194 12.6059 6.05694 10.7676 6.05694ZM10.7676 11.0569C9.84841 11.0569 9.10091 10.3094 9.10091 9.39028C9.10091 8.47111 9.84841 7.72361 10.7676 7.72361C11.6867 7.72361 12.4342 8.47111 12.4342 9.39028C12.4342 10.3094 11.6867 11.0569 10.7676 11.0569Z"
            fill={color}
        />
    </Svg>
);
export default ResidenceIcon;
