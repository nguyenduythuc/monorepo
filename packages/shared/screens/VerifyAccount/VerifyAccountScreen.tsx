import {otpIcon} from '@lfvn-customer/shared/assets';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useVerifyAccount from '@lfvn-customer/shared/hooks/useVerifyAccount';
import {Image} from '@lfvn-customer/shared/components';

const VerifyAccountScreen = ({t}: {t: any}) => {
  const {theme} = useGetTheme();
  const {textNegative500, bgDanger500, textUseful500} = theme;

  const {renderFrom, onPressSubmit, onPressGoBack} = useVerifyAccount({t});

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('flex-1 items-center')}>
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
        <TouchableOpacity
          onPress={onPressSubmit}
          style={tw.style(`p-4 mt-4 items-center ${bgDanger500} rounded-10px`)}>
          <Text style={tw.style('text-lg font-semibold text-white')}>
            {t('VerifyAccount.getOTP')}
          </Text>
        </TouchableOpacity>
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
