import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const CheckCircle = ({
  width = 20,
  height = 21,
  color = '#00BC3C',
}: SVGProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 21" fill="none">
    <Path
      d="M8.6 12.6634L6.425 10.4884C6.24167 10.3051 6.01667 10.2134 5.75 10.2134C5.48333 10.2134 5.25 10.3134 5.05 10.5134C4.86667 10.6967 4.775 10.9301 4.775 11.2134C4.775 11.4967 4.86667 11.7301 5.05 11.9134L7.9 14.7634C8.08333 14.9467 8.31667 15.0384 8.6 15.0384C8.88333 15.0384 9.11667 14.9467 9.3 14.7634L14.975 9.0884C15.1583 8.90507 15.25 8.68007 15.25 8.4134C15.25 8.14674 15.15 7.9134 14.95 7.7134C14.7667 7.53007 14.5333 7.4384 14.25 7.4384C13.9667 7.4384 13.7333 7.53007 13.55 7.7134L8.6 12.6634ZM10 20.8634C8.61667 20.8634 7.31667 20.6007 6.1 20.0754C4.88333 19.5507 3.825 18.8384 2.925 17.9384C2.025 17.0384 1.31267 15.9801 0.788 14.7634C0.262667 13.5467 0 12.2467 0 10.8634C0 9.48007 0.262667 8.18007 0.788 6.9634C1.31267 5.74674 2.025 4.6884 2.925 3.7884C3.825 2.8884 4.88333 2.17574 6.1 1.6504C7.31667 1.12574 8.61667 0.863403 10 0.863403C11.3833 0.863403 12.6833 1.12574 13.9 1.6504C15.1167 2.17574 16.175 2.8884 17.075 3.7884C17.975 4.6884 18.6873 5.74674 19.212 6.9634C19.7373 8.18007 20 9.48007 20 10.8634C20 12.2467 19.7373 13.5467 19.212 14.7634C18.6873 15.9801 17.975 17.0384 17.075 17.9384C16.175 18.8384 15.1167 19.5507 13.9 20.0754C12.6833 20.6007 11.3833 20.8634 10 20.8634Z"
      fill={color}
    />
  </Svg>
);
export default CheckCircle;
