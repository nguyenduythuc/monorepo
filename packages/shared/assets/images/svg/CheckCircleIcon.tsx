import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const CheckCircleIcon = ({size = 25, color = 'white'}: SVGProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.7422 22C18.265 22 22.7422 17.5228 22.7422 12C22.7422 6.47715 18.265 2 12.7422 2C7.21934 2 2.74219 6.47715 2.74219 12C2.74219 17.5228 7.21934 22 12.7422 22ZM17.2594 9.86968C17.5944 9.46775 17.5401 8.87037 17.1381 8.5354C16.7362 8.20044 16.1389 8.25472 15.8039 8.65666L11.7311 13.5436L9.62258 11.4351C9.2526 11.0651 8.65277 11.0651 8.28279 11.4351C7.91283 11.805 7.91283 12.4049 8.28279 12.7748L11.1249 15.6169C11.3131 15.8052 11.5718 15.9055 11.8377 15.8935C12.1036 15.8813 12.3521 15.758 12.5226 15.5536L17.2594 9.86968Z"
      fill={color}
    />
  </Svg>
);
export default CheckCircleIcon;
