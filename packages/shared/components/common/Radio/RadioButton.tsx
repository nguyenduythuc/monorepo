import React, { FC } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export type RadioButtonProps = {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  color?: string;
  selected?: boolean;
  size?: 'sm' | 'lg' | 'xl';
  renderContent?: React.ReactNode;
  group?: { label: string; value: string }[];
};

export const RadioButton: FC<RadioButtonProps> = ({
  disabled,
  onPress,
  color = 'blue',
  selected,
  label,
  size = 'sm',
  renderContent,
}) => {
  const radioSz = {
    text: {
      sm: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  };

  return (
    <TouchableOpacity
      style={[tw`items-center my-2`, disabled && tw`opacity-50`]}
      disabled={disabled}
      onPress={onPress}>
      <View
        style={[
          tw`flex flex-row border-[1px] rounded-lg bg-white items-center justify-center px-3 py-2`,
          selected
            ? tw`border-${color}-500 bg-${color}-100`
            : tw`border-gray-300`,
        ]}>
        {renderContent}
        {!renderContent && (
          <Text
            style={[
              tw`${radioSz.text[size]}`,
              selected ? tw`text-${color}-500` : null,
            ]}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
