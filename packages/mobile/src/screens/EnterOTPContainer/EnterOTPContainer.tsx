import React from 'react';
import {View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {EnterOTPScreen} from '@lfvn-customer/shared/screens/EnterOTP';
import {useRoute} from '@react-navigation/native';
import {EnterOTPScreenRouteProps} from '../../types/paramtypes';
import {AppbarBackAction} from '@lfvn-customer/shared/components';

const EnterOTPContainer = () => {
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
        <AppbarBackAction containerStyle="mx-2" />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <EnterOTPScreen
            authSeq={authSeq}
            phoneNumber={phoneNumber}
            identityNumber={identityNumber}
            type={type}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EnterOTPContainer;
