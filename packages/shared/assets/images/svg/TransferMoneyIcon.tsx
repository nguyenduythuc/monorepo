import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SVGProps} from '../../../types';

const TransferMoneyIcon = ({
  width = 20,
  height = 20,
  color = '#fff',
}: SVGProps) => (
  <Svg width={width} height={height} viewBox={`0 0 20 20`} fill="none">
    <Path
      d="M17.5243 15.2167C17.6314 15.4751 17.5723 15.7733 17.3738 15.9708L14.6046 18.74C14.4698 18.8748 14.2926 18.9431 14.1154 18.9431C13.9382 18.9431 13.7609 18.8757 13.6262 18.74C13.3557 18.4696 13.3557 18.0311 13.6262 17.7607L15.2138 16.173H2.11538C1.73323 16.173 1.42308 15.8628 1.42308 15.4807C1.42308 15.0985 1.73323 14.7883 2.11538 14.7883H16.8846C17.1643 14.7883 17.4172 14.9582 17.5243 15.2167ZM4.88462 3.71235H3.96154C3.57938 3.71235 3.26923 4.0225 3.26923 4.40465C3.26923 4.78681 3.57938 5.09696 3.96154 5.09696H4.88462C5.26677 5.09696 5.57692 4.78681 5.57692 4.40465C5.57692 4.0225 5.26677 3.71235 4.88462 3.71235ZM15.0385 9.25081H14.1154C13.7332 9.25081 13.4231 9.56096 13.4231 9.94312C13.4231 10.3253 13.7332 10.6354 14.1154 10.6354H15.0385C15.4206 10.6354 15.7308 10.3253 15.7308 9.94312C15.7308 9.56096 15.4206 9.25081 15.0385 9.25081ZM12.9615 7.17388C12.9615 9.08281 11.4089 10.6354 9.5 10.6354C7.59108 10.6354 6.03846 9.08281 6.03846 7.17388C6.03846 5.26496 7.59108 3.71235 9.5 3.71235C11.4089 3.71235 12.9615 5.26496 12.9615 7.17388ZM11.5769 7.17388C11.5769 6.02835 10.6455 5.09696 9.5 5.09696C8.35446 5.09696 7.42308 6.02835 7.42308 7.17388C7.42308 8.31942 8.35446 9.25081 9.5 9.25081C10.6455 9.25081 11.5769 8.31942 11.5769 7.17388ZM18.5 3.48158V10.8662C18.5 12.2665 17.3618 13.4047 15.9615 13.4047H3.03846C1.63815 13.4047 0.5 12.2665 0.5 10.8662V3.48158C0.5 2.08127 1.63815 0.943115 3.03846 0.943115H15.9615C17.3618 0.943115 18.5 2.08127 18.5 3.48158ZM17.1154 3.48158C17.1154 2.84558 16.5975 2.32773 15.9615 2.32773H3.03846C2.40246 2.32773 1.88462 2.84558 1.88462 3.48158V10.8662C1.88462 11.5022 2.40246 12.02 3.03846 12.02H15.9615C16.5975 12.02 17.1154 11.5022 17.1154 10.8662V3.48158Z"
      fill={color}
    />
  </Svg>
);
export default TransferMoneyIcon;
