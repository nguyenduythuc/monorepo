import React, {FC, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export type RadioButtonProps = {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  color?: string;
  selected?: boolean;
  size?: 'sm' | 'lg' | 'xl';
  group?: {label: string; value: string}[];
};

export const RadioButton: FC<RadioButtonProps> = ({
  disabled,
  onPress,
  color = 'blue',
  selected,
  label,
  size = 'sm',
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
      style={[
        tw`flex flex-row items-center my-2 mr-2`,
        disabled && tw`opacity-50`,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <View
        style={[
          tw`border-[1px] rounded bg-white items-center justify-center px-3 py-2`,
          selected ? tw`border-${color}-500` : tw`border-gray-200`,
        ]}>
        <Text
          style={[
            tw`${radioSz.text[size]}`,
            selected ? tw`text-${color}-500` : null,
          ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
