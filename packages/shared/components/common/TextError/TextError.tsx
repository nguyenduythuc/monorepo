import React from 'react';
import {IErorMsgProps} from '../../../types';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export const TextError: React.FC<IErorMsgProps> = ({
  title,
  errorStyle = '',
  containerErrorStyle = '',
}) => {
  if (!title) return null;
  return (
    <View style={tw.style(['mt-2', errorStyle])}>
      <Text
        numberOfLines={2}
        style={tw.style(['text-sm text-red-600'], containerErrorStyle)}>
        {title}
      </Text>
    </View>
  );
};
