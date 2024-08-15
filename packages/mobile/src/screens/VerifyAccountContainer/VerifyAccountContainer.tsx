import React from 'react';
import {View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {VerifyAccountScreen} from '@lfvn-customer/shared/screens/VerifyAccount';
import {useRoute} from '@react-navigation/native';
import {VerifyAccountScreenRouteProps} from '../../types/paramtypes';
import {AppbarBackAction} from '@lfvn-customer/shared/components';

const VerifyAccountContainer = () => {
  const route = useRoute<VerifyAccountScreenRouteProps>();

  const {type} = route.params;

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
          <VerifyAccountScreen type={type} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default VerifyAccountContainer;
