import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {SimulateScreen} from '@lfvn-customer/shared/screens';

export const SimulateScreenContainer = () => {
  return (
    <View style={tw`h-screen bg-white`}>
      <SafeAreaView style={tw`h-screen`}>
        <SimulateScreen />
      </SafeAreaView>
    </View>
  );
};

export default SimulateScreenContainer;
