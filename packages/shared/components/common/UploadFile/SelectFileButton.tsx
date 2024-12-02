import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon, IconKeys} from '../Icon';

export const SelectFileButton = ({
  icon,
  title,
  description,
  customStyle,
  onPress,
}: {
  icon: IconKeys;
  title: string;
  description?: string;
  customStyle?: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      style={tw.style(
        'flex-1 border  justify-center rounded-lg border-blue-200 bg-[#F4F8FF]',
        `${customStyle}`,
      )}
      onPress={onPress}>
      <View style={tw.style('items-center px-3 py-4 flex-col')}>
        <Icon name={icon} disabled />
        <Text style={tw.style('font-medium text-base mt-1')}>{title}</Text>
        {!!description && (
          <Text style={tw.style('text-gray-400 text-center')}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
