import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useEnterOTP from '@lfvn-customer/shared/hooks/useEnterOTP';
import {ConfirmModal, Icon, Image} from '@lfvn-customer/shared/components';
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
  currentPassword,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
  type: OTPTypesEnum;
  newPassword?: string;
  currentPassword?: string;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500, textDanger500, textNegative200} = theme;
  const [value, setValue] = useState('');
  const {
    onPressResendOTP,
    counter,
    isCounting,
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
  } = useEnterOTP({
    authSeq,
    phoneNumber,
    identityNumber,
    type,
    value,
    setValue,
  });

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('items-center')}>
        <Image iconName="otp_icon" style={styles.imgLogo} />
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
      <OTPInput
        authSeq={authSeq}
        type={type}
        newPassword={newPassword}
        currentPassword={currentPassword}
        value={value}
        setValue={setValue}
      />
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
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        title={t('Modal.notSuccess')}
        content={msgRequestError}
        labelButtonRight={t('Modal.agree')}
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
