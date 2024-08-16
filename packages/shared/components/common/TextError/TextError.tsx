import React from 'react';
import {IErorMsgProps} from '@lfvn-customer/shared/types';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

export const TextError: React.FC<IErorMsgProps> = ({
  title,
  errorStyle = '',
  containerErrorStyle = '',
}) => {
  const t = useTranslations();
  if (!title) return null;
  return (
    <View style={tw.style(['mt-2', errorStyle])}>
      <Text
        numberOfLines={2}
        style={tw.style(['text-sm text-red-600'], containerErrorStyle)}>
        {t(title)}
      </Text>
    </View>
  );
};
