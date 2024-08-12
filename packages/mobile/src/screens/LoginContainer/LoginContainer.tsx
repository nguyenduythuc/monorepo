import React from 'react';
import {View, ImageBackground, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {bgLogin} from '@lfvn-customer/shared/assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoginScreen} from '@lfvn-customer/shared/screens/Login';
import {useTranslations} from 'use-intl';

const LoginContainer = () => {
  const t = useTranslations();

  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={Platform.OS === 'android' ? {uri: 'login_bg'} : bgLogin}
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <LoginScreen t={t} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default LoginContainer;
