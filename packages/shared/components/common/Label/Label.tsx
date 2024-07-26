import React from 'react';
import {ILabelProps} from '../../../types';
import {View, Text} from 'react-native';
import tw from '../../../themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

export const Label: React.FC<ILabelProps> = ({
  title,
  required,
  labelStyle = '',
  containerStyle = '',
}) => {
  const {theme} = useGetTheme();
  const {textNegative500} = theme;
  if (!title) return null;
  return (
    <View style={tw.style(['flex-row mb-2', containerStyle])}>
      <Text style={tw.style([`text-base ${textNegative500}`], labelStyle)}>
        {title}
      </Text>
      {required && <Text style={tw`text-base text-red-700`}>{' *'}</Text>}
    </View>
  );
};
