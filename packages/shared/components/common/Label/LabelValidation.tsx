import React from 'react';
import {ILabelValidationProps} from '@lfvn-customer/shared/types';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {useTranslations} from 'use-intl';
import {fontStyles} from '@lfvn-customer/shared/themes/colors';
import {Icon} from '../Icon';

export const LabelValidation: React.FC<ILabelValidationProps> = ({
  title,
  labelStyle = '',
  containerStyle = '',
  colorIcon,
}) => {
  const {theme, colors} = useGetTheme();
  const {textNegative500} = theme;
  const t = useTranslations();

  return (
    <View style={tw.style(['flex-row mb-2', containerStyle])}>
      <Icon
        name="check-circle"
        color={colorIcon ? colorIcon : colors['useful-500']}
      />
      <Text
        style={tw.style(
          [`text-base ${textNegative500}`],
          {fontFamily: fontStyles.appFontRegular},
          labelStyle,
        )}>
        {t(title)}
      </Text>
    </View>
  );
};
