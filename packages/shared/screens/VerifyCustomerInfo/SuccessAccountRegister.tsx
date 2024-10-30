import {CustomButton, Image} from '@lfvn-customer/shared/components';
import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import useVerifyAccount from '@lfvn-customer/shared/hooks/useVerifyAccount';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';

export const SuccessAccountRegister = () => {
  const {user} = useAppSelector(state => state.auth);

  const t = useTranslations();

  const {onSuccessSubmit} = useVerifyAccount({
    type: OTPTypesEnum.VERIFY_CUSTOMER_BEFORE_LOAN,
  });
  return (
    <>
      <ScrollView style={tw.style('flex-1')}>
        <View style={tw.style('items-center justify-center mx-4')}>
          <Image iconName="celebrate" style={styles.imgLogo} />
          <Text style={tw.style('text-3xl font-bold mb-4')}>
            {t('VerifyCustomer.successRegister')}
          </Text>
          <Text style={tw.style('text-base text-center mb-2')}>
            {t('VerifyCustomer.congratsSuccessAccountRegister')}
          </Text>
          <Text style={tw.style('text-2xl font-semibold text-red-500 mb-2')}>
            {user?.login}
          </Text>
          <Text style={tw.style('text-base text-center mb-2')}>
            {t('VerifyCustomer.yourFirstPassword')}
          </Text>

          <Text style={tw.style('text-2xl font-semibold text-red-500 mb-2')}>
            {user?.phoneNumber}
          </Text>
        </View>
      </ScrollView>
      <View style={tw.style('px-4 pt-3')}>
        <CustomButton onPress={onSuccessSubmit} color="red">
          {t('VerifyCustomer.login')}
        </CustomButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imgLogo: {
    // width: 200,
    height: 240,
    marginLeft: 20,
    marginTop: 130,
    transform: [{rotate: '20deg'}],
  },
});
