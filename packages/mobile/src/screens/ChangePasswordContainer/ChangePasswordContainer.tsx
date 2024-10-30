import React from 'react';
import {View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {AppbarBackAction} from '@lfvn-customer/shared/components';
import {ChangePasswordScreen} from '@lfvn-customer/shared/screens';
import {ResetPasswordRouteProps} from '@lfvn-customer/shared/types/paramtypes';
import {useRoute} from '@react-navigation/native';

const ChangePasswordContainer = () => {
  const route = useRoute<ResetPasswordRouteProps>();

  const {phoneNumber, identityNumber} = route.params;

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
          <ChangePasswordScreen
            phoneNumber={phoneNumber}
            identityNumber={identityNumber}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChangePasswordContainer;
