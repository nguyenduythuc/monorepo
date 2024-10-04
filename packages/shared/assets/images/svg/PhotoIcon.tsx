import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from '@lfvn-customer/shared/types';

const PhotoIcon = ({ size = 33, color = '#2F6BFF' }: SVGProps) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 33 33"
        fill="none"

    >
        <Path
            d="M23.0019 4.04492H6.54579C5.65215 4.04492 4.92773 4.76934 4.92773 5.66297V22.1191C4.92773 23.0127 5.65215 23.7371 6.54579 23.7371H7.61428V8.35033C7.61428 7.45669 8.3387 6.73228 9.23234 6.73228H24.6192V5.66378C24.62 4.76934 23.8955 4.04492 23.0019 4.04492Z"
            fill={color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.2194 8.354H10.9454C10.001 8.354 9.23633 9.11952 9.23633 10.0631V26.3371C9.23633 27.2815 10.0018 28.0462 10.9454 28.0462H27.2194C28.1638 28.0462 28.9285 27.2807 28.9285 26.3371V10.0639C28.9285 9.11952 28.163 8.354 27.2194 8.354ZM14.7739 15.7984C15.8264 15.7984 16.6796 14.9452 16.6796 13.8927C16.6796 12.8401 15.8264 11.9869 14.7739 11.9869C13.7214 11.9869 12.8682 12.8401 12.8682 13.8927C12.8682 14.9452 13.7214 15.7984 14.7739 15.7984ZM22.7561 16.2053L27.3895 24.688C27.5749 25.0264 27.3299 25.439 26.9439 25.4398H21.2437H11.2203C10.8037 25.4398 10.5643 24.9651 10.8117 24.6299L14.4725 19.6767C14.8698 19.1335 15.6433 19.0409 16.1574 19.4744L17.4217 20.5405C17.9262 20.9651 18.6885 20.8507 19.0454 20.2963L21.7038 16.1674C21.9552 15.7766 22.5337 15.7975 22.7561 16.2053Z"
            fill={color}
        />
    </Svg>
);
export default PhotoIcon;
