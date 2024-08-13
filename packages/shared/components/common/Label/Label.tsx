import React from 'react';
import {ILabelProps} from '@lfvn-customer/shared/types';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {useTranslations} from 'use-intl';
import { fontStyles } from '@lfvn-customer/shared/themes/colors';

export const Label: React.FC<ILabelProps> = ({
  title,
  required,
  labelStyle = '',
  containerStyle = '',
}) => {
  const {theme} = useGetTheme();
  const {textNegative500} = theme;
  const t = useTranslations();

  return (
    <View style={tw.style(['flex-row mb-2', containerStyle])}>
      {title && (
        <>
          <Text style={tw.style([`text-base ${textNegative500}`], {fontFamily: fontStyles.appFontRegular}, labelStyle)}>
            {t(title)}
          </Text>
          {required && <Text style={tw`text-base text-red-700`}>{' *'}</Text>}
        </>
      )}
    </View>
  );
};
