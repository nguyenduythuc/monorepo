import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {EnterOTPScreen} from '@lfvn-customer/shared/screens/EnterOTP';
import useVerifyAccount from '@lfvn-customer/shared/hooks/useVerifyAccount';
import {useRoute} from '@react-navigation/native';
import {EnterOTPScreenRouteProps} from '../../types/paramtypes';
import {useTranslations} from 'use-intl';

const EnterOTPContainer = () => {
  const t = useTranslations();
  const {onPressGoBack} = useVerifyAccount({t});

  const route = useRoute<EnterOTPScreenRouteProps>();

  const {authSeq, phoneNumber, identityNumber, type} = route.params;

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
          <EnterOTPScreen
            authSeq={authSeq}
            phoneNumber={phoneNumber}
            identityNumber={identityNumber}
            t={t}
            type={type}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EnterOTPContainer;
