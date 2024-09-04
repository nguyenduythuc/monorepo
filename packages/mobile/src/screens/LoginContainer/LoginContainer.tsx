import React from 'react';
import {View, ImageBackground, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoginScreen} from '@lfvn-customer/shared/screens/Login';
import {Appbar} from '@lfvn-customer/shared/components';
import ImageName from '@lfvn-customer/shared/assets/images';

const LoginContainer = () => {
  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={
          Platform.OS === 'android' ? {uri: 'login_bg'} : ImageName['login_bg']
        }
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <Appbar backIconColor="white" />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <LoginScreen />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default LoginContainer;
