import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {SignUpScreen} from '@lfvn-customer/shared/screens/SignUp';
import useVerifyAccount from '@lfvn-customer/shared/hooks/useVerifyAccount';
import {useTranslations} from 'use-intl';

const SignUpContainer = () => {
  const t = useTranslations();
  const {onPressGoBack} = useVerifyAccount({t});

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <TouchableOpacity onPress={onPressGoBack}>
          <Text>Back</Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <SignUpScreen t={t} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUpContainer;
