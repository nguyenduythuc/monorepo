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
import {useTranslations} from 'use-intl';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useEnterOTP from '@lfvn-customer/shared/hooks/useEnterOTP';
import {CodeField} from 'react-native-confirmation-code-field';
import {ConfirmModal, Icon} from '../../components';
import {maskPhoneNumber, formatTime} from '@lfvn-customer/shared/utils';

const EnterOTPScreen = ({
  authSeq,
  phoneNumber,
  identityNumber,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
}) => {
  const t = useTranslations();
  const {theme, colors} = useGetTheme();
  const {textNegative500, borderDanger500, textDanger500, textNegative300} =
    theme;

  const {
    onPressResendOTP,
    value,
    setValue,
    counter,
    isCounting,
    ref,
    props,
    CELL_COUNT,
    getCellOnLayoutHandler,
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
  } = useEnterOTP({authSeq, phoneNumber, identityNumber});

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
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={tw.style(
              `${
                isFocused || index + 1 > value.length
                  ? 'border-neutral-200'
                  : borderDanger500
              }`,
              'items-center justify-center',
              styles.cell,
            )}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text
              style={tw.style(
                `text-2xl text-center font-medium ${textNegative500}`,
              )}>
              {symbol}
            </Text>
          </View>
        )}
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
