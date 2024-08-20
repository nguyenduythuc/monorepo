import React from 'react';
import {View, Text, TouchableOpacity, TextStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon, IconKeys} from '../Icon';

export type AppbarActionProp = {
  onPress?: () => void;
  icon?: IconKeys;
  iconColor?: string;
  title?: string;
  titleStyle?: TextStyle;
};

export const AppbarAction = ({
  onPress,
  icon,
  title,
  titleStyle,
  iconColor = '#333333',
}: AppbarActionProp) => {
  return (
    <View style={tw`flex-1 justify-end items-end`}>
      <TouchableOpacity onPress={onPress} style={tw`flex-row items-center`}>
        {icon && (
          <Icon name={icon} width={15} color={iconColor} disabled></Icon>
        )}
        <Text style={[tw`text-base`, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
