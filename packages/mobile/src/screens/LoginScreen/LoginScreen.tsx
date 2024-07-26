import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useLoginScreen from '@lfvn-customer/shared/hooks/useLogin';
import useLoginBiometrics from '@lfvn-customer/shared/hooks/useLoginBiometrics';
import {bgLogin, logoAppTransparent} from '@lfvn-customer/shared/assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslations} from 'use-intl';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {Icon} from '@lfvn-customer/shared/components';

const LoginScreen = () => {
  const {renderFrom, getValues, onPressSubmit} = useLoginScreen();
  const {callBiometric} = useLoginBiometrics();
  const t = useTranslations();
  const {theme, colors} = useGetTheme();
  const {textNegative500, textUseful500, textNegative300} = theme;

  const onPressBiometrics = () => {
    console.log('submit', getValues());
    callBiometric({
      username: 'test',
      password: 'test',
    })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={Platform.OS === 'android' ? {uri: 'login_bg'} : bgLogin}
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <Image
            source={
              Platform.OS === 'android'
                ? {uri: 'logo_app_transparent'}
                : logoAppTransparent
            }
            style={styles.imgLogo}
          />
          <Text
            style={tw.style('text-white mt-24 text-2xl font-semibold px-4')}>
            {t('Login.title')}
          </Text>
          <Text
            style={tw.style('text-white mt-1 text-32px font-semibold px-4')}>
            {t('Login.desc')}
          </Text>
          <View style={tw.style('flex-1 bg-white p-6 mt-4 rounded-t-20px')}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              enableOnAndroid
              keyboardShouldPersistTaps="handled">
              <View style={tw.style('flex-1')}>
                <Text
                  style={tw.style(
                    `text-32px font-semibold ${textNegative500}`,
                  )}>
                  {t('Login.login')}
                </Text>
                <Text style={tw.style(`text-lg mt-3 ${textNegative500}`)}>
                  {t('Login.descLogin')}
                </Text>
                {renderFrom()}
                <View style={tw.style('flex-row justify-between mb-4')}>
                  <TouchableOpacity>
                    <Text
                      style={tw.style(
                        `text-base font-semibold ${textUseful500}`,
                      )}>
                      {t('Login.dontHaveAcc')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={tw.style(
                        `text-base font-semibold ${textUseful500}`,
                      )}>
                      {t('Login.forgotPassword')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={onPressSubmit}
                  style={tw.style('p-4 items-center bg-red-500 rounded-10px')}>
                  <Text style={tw.style('text-lg font-semibold text-white')}>
                    {t('Login.login')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw.style('flex-row justify-center mt-6 items-center')}>
                  <Text
                    style={tw.style(
                      `text-base font-semibold mr-2 ${textUseful500}`,
                    )}>
                    {t('Login.otpLogin')}
                  </Text>
                  <Icon
                    name="arrow-right"
                    size={16}
                    color={colors['useful-500']}
                  />
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
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imgLogo: {
    width: 115,
    height: 41,
    marginTop: 16,
    marginHorizontal: 16,
  },
});

export default LoginScreen;
