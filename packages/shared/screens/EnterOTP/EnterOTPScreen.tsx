import {otpIcon} from '@lfvn-customer/shared/assets';
import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useEnterOTP from '@lfvn-customer/shared/hooks/useEnterOTP';
import {ConfirmModal, Icon} from '@lfvn-customer/shared/components';
import {maskPhoneNumber, formatTime} from '@lfvn-customer/shared/utils';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {OTPInput} from '@lfvn-customer/shared/components/common/OTPInput';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';

const EnterOTPScreen = ({
  authSeq,
  phoneNumber,
  identityNumber,
  type,
  newPassword,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
  type: OTPTypesEnum;
  newPassword?: string;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500, textDanger500, textNegative200} = theme;

  const {
    onPressResendOTP,
    counter,
    isCounting,
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
  } = useEnterOTP({authSeq, phoneNumber, identityNumber, type, newPassword});

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('items-center')}>
        <Image
          source={Platform.OS === 'android' ? {uri: 'otp_icon'} : otpIcon}
          style={styles.imgLogo}
        />
        <Text
          style={tw.style(`text-32px ${textNegative500} font-semibold mt-4`)}>
          {t('EnterOTP.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-4 text-center`)}>
          {t('EnterOTP.desc')}
        </Text>
        <View style={tw.style('flex-row items-center justify-around mt-1')}>
          <Icon name="smart-phone" size={24} />
          <Text
            style={tw.style(`font-semibold ${textNegative500} text-lg ml-1`)}>
            {maskPhoneNumber(phoneNumber)}
          </Text>
        </View>
      </View>
      <OTPInput authSeq={authSeq} type={type} newPassword={newPassword} />
      <View style={tw.style('flex-row items-center justify-between mt-6 mx-4')}>
        <View style={tw.style('flex-row items-center')}>
          <Text style={tw.style(`text-sm`)}>
            {t('EnterOTP.remainTimeResentOTP')}
          </Text>
          <Text style={tw.style(`text-sm ml-1 ${textDanger500}`)}>
            {formatTime(counter)}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressResendOTP} disabled={isCounting}>
          <Text
            style={tw.style(
              `text-base font-semibold ${
                isCounting ? textNegative200 : textNegative500
              }`,
            )}>
            {t('EnterOTP.resendOTP')}
          </Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        visiable={isModalVisible}
        setVisiable={setIsModalVisible}
        title={t('Modal.notSuccess')}
        content={msgRequestError}
        labelButton1={t('Modal.agree')}
      />
    </View>
  );
};

export default EnterOTPScreen;

const styles = StyleSheet.create({
  imgLogo: {
    width: 120,
    height: 120,
    marginTop: 16,
  },
});
