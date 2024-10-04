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
  customStyle?: string
};

export const RadioButton: FC<RadioButtonProps> = ({
  disabled,
  onPress,
  color = 'blue',
  selected,
  label,
  size = 'sm',
  renderContent,
  customStyle
}) => {
  const radioSz = {
    text: {
      sm: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  };

  return (
    <View
      style={[
        tw`flex-1`,
      ]}>
      <TouchableOpacity
        style={[tw`rounded-lg bg-white my-2 border-[1px] px-3 py-2 `,
        !!customStyle && tw`${customStyle}`,
        disabled && tw`opacity-50`,
        selected ? tw`border-${color}-500 bg-${color}-100`
          : tw`border-gray-300`,
        ]}
        disabled={disabled}
        onPress={onPress}>
        {!!renderContent
          ? renderContent
          : <Text
            style={[
              tw`items-start text-left ${radioSz.text[size]}`,
              selected ? tw`text-${color}-500` : null,
            ]}>
            {label}
          </Text>}
      </TouchableOpacity>
    </View>
  );
};
