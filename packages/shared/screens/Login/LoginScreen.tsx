import React, {useEffect} from 'react';
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
import {logoAppTransparent} from '@lfvn-customer/shared/assets';
import useLoginScreen from '@lfvn-customer/shared/hooks/useLogin';
import {Appbar, CustomButton, Icon} from '@lfvn-customer/shared/components';
import Toast from 'react-native-toast-message';

const LoginScreen = ({t}: {t: any}) => {
  const {theme, colors} = useGetTheme();
  const {textNegative500, textUseful500, textNegative300} = theme;

  const {
    renderFrom,
    isError,
    onPressSubmit,
    onPressOTPLogin,
    onPressSignUp,
    onPressForgotPassword,
  } = useLoginScreen();

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: t('Login.msgLoginFail'),
      });
    }
  }, [isError]);
  return (
    <View style={tw.style('flex-1')}>
      <Image
        source={
          Platform.OS === 'android'
            ? {uri: 'logo_app_transparent'}
            : logoAppTransparent
        }
        style={styles.imgLogo}
      />

      <Text style={tw.style('text-white mt-24 text-2xl font-semibold px-4')}>
        {t('Login.title')}
      </Text>
      <Text style={tw.style('text-white mt-1 text-32px font-semibold px-4')}>
        {t('Login.desc')}
      </Text>
      <View style={tw.style('flex-1 bg-white p-6 mt-4 rounded-t-20px')}>
        <View style={tw.style('flex-1')}>
          <Text style={tw.style(`text-32px font-semibold ${textNegative500}`)}>
            {t('Login.login')}
          </Text>
          <Text style={tw.style(`text-lg mt-3 ${textNegative500}`)}>
            {t('Login.descLogin')}
          </Text>
          {renderFrom()}
          <View style={tw.style('flex-row justify-between mb-4')}>
            <TouchableOpacity onPress={onPressSignUp}>
              <Text
                style={tw.style(`text-base font-semibold ${textUseful500}`)}>
                {t('Login.dontHaveAcc')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressForgotPassword}>
              <Text
                style={tw.style(`text-base font-semibold ${textUseful500}`)}>
                {t('Login.forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw.style('mt-4')}>
            <CustomButton onPress={onPressSubmit} color={'red'}>
              {t('Login.login')}
            </CustomButton>
          </View>
          <TouchableOpacity
            style={tw.style('flex-row justify-center mt-6 items-center')}
            onPress={onPressOTPLogin}>
            <Text
              style={tw.style(`text-base font-semibold mr-2 ${textUseful500}`)}>
              {t('Login.otpLogin')}
            </Text>
            <Icon name="arrow-right" size={16} color={colors['useful-500']} />
          </TouchableOpacity>
        </View>
        <View style={tw.style('flex-row justify-center mt-8')}>
          <TouchableOpacity>
            <Text
              style={tw.style(
                `text-base text-decoration-line: underline ${textNegative300}`,
              )}>
              {t('Login.conditional')}
            </Text>
          </TouchableOpacity>
          <Text style={tw.style(`text-base ${textNegative300}`)}>
            {` ${t('Login.and')} `}
          </Text>
          <TouchableOpacity>
            <Text
              style={tw.style(
                `text-base text-decoration-line: underline ${textNegative300}`,
              )}>
              {t('Login.policy')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imgLogo: {
    width: 115,
    height: 41,
    marginTop: 16,
    marginHorizontal: 16,
  },
});
