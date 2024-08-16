import React from 'react';
import {View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {SignUpScreen} from '@lfvn-customer/shared/screens/SignUp';
import {Appbar} from '@lfvn-customer/shared/components';

const SignUpContainer = () => {
  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <Appbar />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <SignUpScreen />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUpContainer;
