import React, {FC, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export type RadioProps = {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  color?: string;
  selected?: boolean;
  size?: 'sm' | 'lg' | 'xl';
};

export const Radio: FC<RadioProps> = ({
  disabled,
  onPress,
  color = 'blue',
  selected,
  label,
  size = 'sm',
}) => {
  const radioSz = {
    size: {sm: 'h-5 w-5', lg: 'h-6 w-6', xl: 'h-7 w-7'},
    border: {
      sm: 'border-[6px]',
      lg: 'border-[7px]',
      xl: 'border-[8px]',
    },
    text: {
      sm: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  };

  const radioStyle = tw`${radioSz.size[size]} ${radioSz.border[size]} border-${color}-500 rounded-full bg-white`;
  return (
    <TouchableOpacity
      style={[
        tw`flex flex-row items-center mb-3 mr-3`,
        disabled && tw`opacity-50`,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <View
        style={tw`${radioSz.size[size]} border-gray-200 border-[1px] bg-white rounded-full items-center justify-center mr-2`}>
        <View style={[selected ? radioStyle : null]} />
      </View>
      <Text style={tw`${radioSz.text[size]}`}>{label}</Text>
    </TouchableOpacity>
  );
};
