import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RBPInformationScreen} from '@lfvn-customer/shared/screens';

const RBPInformationContainer = () => {
  return (
    <SafeAreaView style={tw.style('flex-1')}>
      <RBPInformationScreen />
    </SafeAreaView>
  );
};

export default RBPInformationContainer;
