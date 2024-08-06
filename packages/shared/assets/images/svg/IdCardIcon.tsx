import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SVGProps} from '@lfvn-customer/shared/types';

const IdCardIcon = ({size = 25, color = '#E7252B'}: SVGProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path
      d="M20.7721 19.7207H4.9388C3.79047 19.7207 2.85547 18.7857 2.85547 17.6374V6.80404C2.85547 5.6557 3.79047 4.7207 4.9388 4.7207H20.7721C21.9205 4.7207 22.8555 5.6557 22.8555 6.80404V17.6374C22.8555 18.7857 21.9205 19.7207 20.7721 19.7207ZM4.9388 5.55404C4.24964 5.55404 3.6888 6.11487 3.6888 6.80404V17.6374C3.6888 18.3265 4.24964 18.8874 4.9388 18.8874H20.7721C21.4613 18.8874 22.0221 18.3265 22.0221 17.6374V6.80404C22.0221 6.11487 21.4613 5.55404 20.7721 5.55404H4.9388Z"
      fill={color}
    />
    <Path
      d="M9.10286 12.2214C7.95453 12.2214 7.01953 11.2864 7.01953 10.138C7.01953 8.98969 7.95453 8.05469 9.10286 8.05469C10.2512 8.05469 11.1862 8.98969 11.1862 10.138C11.1862 11.2864 10.2512 12.2214 9.10286 12.2214ZM9.10286 8.88802C8.4137 8.88802 7.85286 9.44885 7.85286 10.138C7.85286 10.8272 8.4137 11.388 9.10286 11.388C9.79203 11.388 10.3529 10.8272 10.3529 10.138C10.3529 9.44885 9.79203 8.88802 9.10286 8.88802Z"
      fill={color}
    />
    <Path
      d="M12.4388 16.388C12.2088 16.388 12.0221 16.2014 12.0221 15.9714V15.138C12.0221 14.4489 11.4613 13.888 10.7721 13.888H7.4388C6.74964 13.888 6.1888 14.4489 6.1888 15.138V15.9714C6.1888 16.2014 6.00214 16.388 5.77214 16.388C5.54214 16.388 5.35547 16.2014 5.35547 15.9714V15.138C5.35547 13.9897 6.29047 13.0547 7.4388 13.0547H10.7721C11.9205 13.0547 12.8555 13.9897 12.8555 15.138V15.9714C12.8555 16.2014 12.6688 16.388 12.4388 16.388Z"
      fill={color}
    />
    <Path
      d="M19.9362 9.72005H14.9362C14.7062 9.72005 14.5195 9.53339 14.5195 9.30339C14.5195 9.07339 14.7062 8.88672 14.9362 8.88672H19.9362C20.1662 8.88672 20.3529 9.07339 20.3529 9.30339C20.3529 9.53339 20.1662 9.72005 19.9362 9.72005Z"
      fill={color}
    />
    <Path
      d="M19.9362 13.054H14.9362C14.7062 13.054 14.5195 12.8674 14.5195 12.6374C14.5195 12.4074 14.7062 12.2207 14.9362 12.2207H19.9362C20.1662 12.2207 20.3529 12.4074 20.3529 12.6374C20.3529 12.8674 20.1662 13.054 19.9362 13.054Z"
      fill={color}
    />
    <Path
      d="M19.9362 16.388H14.9362C14.7062 16.388 14.5195 16.2014 14.5195 15.9714C14.5195 15.7414 14.7062 15.5547 14.9362 15.5547H19.9362C20.1662 15.5547 20.3529 15.7414 20.3529 15.9714C20.3529 16.2014 20.1662 16.388 19.9362 16.388Z"
      fill={color}
    />
  </Svg>
);
export default IdCardIcon;
