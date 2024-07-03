import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SVGProps} from '../../../types';

const AddIcon = ({width = 20, height = 21, color = '#000'}: SVGProps) => (
  <Svg width={width} height={height} viewBox={`0 0 20 21`} fill="none">
    <Path
      d="M10 15.9431C10.2833 15.9431 10.521 15.8471 10.713 15.6551C10.9043 15.4638 11 15.2264 11 14.9431V11.9431H14.025C14.3083 11.9431 14.5417 11.8471 14.725 11.6551C14.9083 11.4638 15 11.2264 15 10.9431C15 10.6598 14.904 10.4221 14.712 10.2301C14.5207 10.0388 14.2833 9.94312 14 9.94312H11V6.91812C11 6.63478 10.9043 6.40145 10.713 6.21812C10.521 6.03478 10.2833 5.94312 10 5.94312C9.71667 5.94312 9.47933 6.03878 9.288 6.23012C9.096 6.42212 9 6.65978 9 6.94312V9.94312H5.975C5.69167 9.94312 5.45833 10.0388 5.275 10.2301C5.09167 10.4221 5 10.6598 5 10.9431C5 11.2264 5.09567 11.4638 5.287 11.6551C5.479 11.8471 5.71667 11.9431 6 11.9431H9V14.9681C9 15.2514 9.096 15.4848 9.288 15.6681C9.47933 15.8514 9.71667 15.9431 10 15.9431ZM10 20.9431C8.61667 20.9431 7.31667 20.6804 6.1 20.1551C4.88333 19.6304 3.825 18.9181 2.925 18.0181C2.025 17.1181 1.31267 16.0598 0.788 14.8431C0.262667 13.6264 0 12.3264 0 10.9431C0 9.55978 0.262667 8.25978 0.788 7.04312C1.31267 5.82645 2.025 4.76812 2.925 3.86812C3.825 2.96812 4.88333 2.25545 6.1 1.73012C7.31667 1.20545 8.61667 0.943115 10 0.943115C11.3833 0.943115 12.6833 1.20545 13.9 1.73012C15.1167 2.25545 16.175 2.96812 17.075 3.86812C17.975 4.76812 18.6873 5.82645 19.212 7.04312C19.7373 8.25978 20 9.55978 20 10.9431C20 12.3264 19.7373 13.6264 19.212 14.8431C18.6873 16.0598 17.975 17.1181 17.075 18.0181C16.175 18.9181 15.1167 19.6304 13.9 20.1551C12.6833 20.6804 11.3833 20.9431 10 20.9431Z"
      fill={color}
    />
  </Svg>
);
export default AddIcon;
