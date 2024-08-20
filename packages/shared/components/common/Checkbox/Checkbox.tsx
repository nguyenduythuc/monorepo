import React, {FC} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import Svg, {Path} from 'react-native-svg';

export type CheckboxProps = {
  disabled?: boolean;
  label: string;
  onChange?: (isChecked?: boolean) => void;
  color?: string;
  isChecked?: boolean;
  checkboxRight?: boolean;
  description?: string;
  size?: 'sm' | 'lg' | 'xl';
  children?: React.ReactNode;
  required?: boolean;
  errorMessage?: string;
};

export const Checkbox: FC<CheckboxProps> = ({
  disabled,
  label,
  required,
  onChange,
  color = 'blue',
  isChecked = false,
  checkboxRight,
  size = 'sm',
  description = '12341234',
  children,
  errorMessage,
}) => {
  const handlePress = () => {
    if (onChange) {
      onChange(!isChecked);
    }
  };

  const checkboxSz = {
    sm: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8',
  };

  const checkboxStyle = tw`${checkboxSz[size]} border-2 border-gray-300 items-center justify-center rounded-lg`;
  return (
    <TouchableOpacity
      style={[tw`flex flex-row pr-8 items-start`, disabled && tw`opacity-50`]}
      disabled={disabled}
      onPress={handlePress}>
      {label && checkboxRight && (
        <View>
          <Text style={tw`ml-3 mr-3 text-base pb-2`}>
            {label}
            {required && <Text style={tw`text-base text-red-500`}>{' *'}</Text>}
          </Text>
          <Text style={tw`ml-3 mr-3 text-sm text-blue-600`}>{description}</Text>
        </View>
      )}
      <View
        style={[
          checkboxStyle,
          !!errorMessage && tw`border-red-600`,
          isChecked && tw`bg-${color}-600 border-${color}-600`,
        ]}>
        {isChecked && (
          <View style={tw`items-center`}>
            <Svg width="12" height="12" viewBox="0 0 11 9" fill="none">
              <Path
                d="M3.26156 7.85285L0.318498 4.81888C0.2426 4.74064 0.182394 4.64775 0.141319 4.54552C0.100243 4.44329 0.0791016 4.33372 0.0791016 4.22307C0.0791016 4.11242 0.100243 4.00285 0.141319 3.90062C0.182394 3.79839 0.2426 3.70551 0.318498 3.62726C0.394396 3.54902 0.4845 3.48696 0.583666 3.44461C0.682832 3.40227 0.789117 3.38047 0.896453 3.38047C1.00379 3.38047 1.11007 3.40227 1.20924 3.44461C1.30841 3.48696 1.39851 3.54902 1.47441 3.62726L3.84361 6.0612L9.4838 0.246792C9.63708 0.0887735 9.84498 0 10.0618 0C10.2785 0 10.4864 0.0887735 10.6397 0.246792C10.793 0.40481 10.8791 0.619128 10.8791 0.8426C10.8791 1.06607 10.793 1.28039 10.6397 1.43841L4.41747 7.85285C4.34163 7.9312 4.25154 7.99335 4.15237 8.03576C4.05319 8.07817 3.94688 8.1 3.83951 8.1C3.73215 8.1 3.62583 8.07817 3.52666 8.03576C3.42749 7.99335 3.3374 7.9312 3.26156 7.85285Z"
                fill="white"
              />
            </Svg>
          </View>
        )}
      </View>
      {children}
      {label && !checkboxRight && (
        <View style={tw`items-start`}>
          <Text style={tw`ml-3 mr-3 text-base pb-1`}>
            {label}
            {required && <Text style={tw`text-base text-red-500`}>{' *'}</Text>}
          </Text>
          <Text style={tw`ml-3 mr-3 text-sm text-blue-600`}>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
