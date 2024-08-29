import {otpIcon} from '@lfvn-customer/shared/assets';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useVerifyAccount from '@lfvn-customer/shared/hooks/useVerifyAccount';
import {
  ConfirmModal,
  CustomButton,
  Image,
} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {useDispatch} from 'react-redux';
import {
  setLoadingScreen,
  clearLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';

const VerifyAccountScreen = ({type}: {type: OTPTypesEnum}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500, textUseful500} = theme;

  const dispatch = useDispatch();

  const {
    renderFrom,
    onPressSubmit,
    onPressGoBack,
    isLoading,
    isModalVerifyVisible,
    setIsModalVerifyVisible,
    msgRequestError,
    onCustomerCancel,
    savePreviousRoute,
  } = useVerifyAccount({type});

  useEffect(() => {
    savePreviousRoute();
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingScreen());
    } else {
      dispatch(clearLoadingScreen());
    }
  }, [isLoading]);

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('items-center')}>
        <Image
          source={{
            android: 'otp_icon',
            ios: otpIcon,
            web: '/images/otp_icon.png',
          }}
          style={styles.imgLogo}
        />
        <Text
          style={tw.style(`text-32px ${textNegative500} font-semibold mt-4`)}>
          {t('VerifyAccount.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-4 text-center`)}>
          {t('VerifyAccount.desc')}
        </Text>
      </View>
      <View style={tw.style('mx-4')}>
        {renderFrom()}
        <CustomButton
          onPress={onPressSubmit}
          color={'red'}
          buttonStyle={'mt-4'}
          loading={isLoading}>
          {t('VerifyAccount.getOTP')}
        </CustomButton>
        <View style={tw.style('flex-row justify-center mt-8')}>
          <Text style={tw.style(`text-lg ${textNegative500}`)}>
            {` ${t('VerifyAccount.haveAnAccount')} `}
          </Text>
          <TouchableOpacity onPress={onPressGoBack}>
            <Text style={tw.style(`text-lg font-semibold ${textUseful500}`)}>
              {t('VerifyAccount.loginID')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmModal
        visible={isModalVerifyVisible}
        setVisible={setIsModalVerifyVisible}
        content={msgRequestError}
        onButtonLeftPress={onCustomerCancel}
      />
    </View>
  );
};

export default VerifyAccountScreen;

const styles = StyleSheet.create({
  imgLogo: {
    width: 120,
    height: 120,
    marginTop: 16,
  },
});
