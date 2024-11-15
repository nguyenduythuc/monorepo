import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Appbar} from '@lfvn-customer/shared/components';
import {VerifyESignForSaleScreen} from '@lfvn-customer/shared/screens';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const VerifyESignForSaleContainer = () => {
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
          <VerifyESignForSaleScreen />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default VerifyESignForSaleContainer;
