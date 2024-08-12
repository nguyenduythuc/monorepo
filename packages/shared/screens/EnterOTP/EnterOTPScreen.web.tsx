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
import useEnterOTP from '@lfvn-customer/shared/hooks/useEnterOTP.web';
import {ConfirmModal, Icon} from '../../components';
import {maskPhoneNumber, formatTime} from '@lfvn-customer/shared/utils';
import OtpInput from 'react-otp-input';

const EnterOTPScreen = ({
  authSeq,
  phoneNumber,
  identityNumber,
  type,
  t,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
  type: string;
  t: any;
}) => {
  const {theme, colors} = useGetTheme();
  const {textNegative500, borderDanger500, textDanger500, textNegative300} =
    theme;

  const {
    onPressResendOTP,
    counter,
    isCounting,
    setIsModalVisible,
    msgRequestError,
    value,
    setValue,
    CELL_COUNT,
  } = useEnterOTP({authSeq, phoneNumber, identityNumber, t, type});

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('flex-1 items-center')}>
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
      <OtpInput
        value={value}
        onChange={setValue}
        numInputs={CELL_COUNT}
        containerStyle={tw.style('justify-around mt-8')}
        inputStyle={tw.style(
          'border-red-500 border rounded-10px w-50px h-50px',
        )}
        renderInput={props => <input {...props} />}
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
          <Text style={tw.style(`text-base font-semibold ${textNegative300}`)}>
            {t('EnterOTP.resendOTP')}
          </Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        visiable={false}
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
  codeFieldRoot: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
