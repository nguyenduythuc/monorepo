import React from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import useResetPassword from '@lfvn-customer/shared/hooks/useResetPassword';
import {CustomButton} from '@lfvn-customer/shared/components';

const ResetPasswordScreen = ({
  phoneNumber,
  identityNumber,
}: {
  phoneNumber: string;
  identityNumber: string;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const {renderFrom, isLoading, onPressSubmit} = useResetPassword({
    phoneNumber,
    identityNumber,
  });

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('px-4')}>
        <Text
          style={tw.style(`text-32px ${textNegative500} font-semibold mt-6`)}>
          {t('ResetPassword.title')}
        </Text>
      </View>
      <View style={tw.style('mx-4')}>
        {renderFrom()}
        <CustomButton
          onPress={onPressSubmit}
          color={'red'}
          buttonStyle={'mt-4'}
          loading={isLoading}>
          {t('ResetPassword.confirm')}
        </CustomButton>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
