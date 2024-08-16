import React from 'react';
import {View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {AppbarBackAction} from '@lfvn-customer/shared/components';
import {ResetPasswordScreen} from '@lfvn-customer/shared/screens';
import {ResetPasswordRouteProps} from '../../types/paramtypes';
import {useRoute} from '@react-navigation/native';

const ResetPasswordContainer = () => {
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
          <ResetPasswordScreen
            phoneNumber={phoneNumber}
            identityNumber={identityNumber}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ResetPasswordContainer;
