import React, { FC } from 'react';
import { View, Pressable } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Icon, IconKeys } from '../Icon';

type ArrowIconProps = {
  size?: number;
  icon?: IconKeys;
  iconColor?: string;
  disabled?: boolean;
  pageNumber?: number;
  selected?: boolean;
  rotate?: boolean;
  onPress: () => void;
};

export const ArrowButton: FC<ArrowIconProps> = ({
  icon,
  iconColor,
  disabled,
  selected,
  onPress,
  rotate,
}) => {
  const buttonStyle = selected ? tw`border-blue-600` : tw` border-gray-300`;

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View
        style={[
          buttonStyle,
          disabled && tw`opacity-25`,
          tw`flex h-8 w-10 mx-1 justify-center bg-white items-center rounded-lg border`,
        ]}>
        {icon && (
          <Icon
            height={12}
            name={icon}
            color={iconColor}
            disabled
            transform={rotate}
          />
        )}
      </View>
    </Pressable>
  );
};
