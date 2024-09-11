import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {LoanInformationScreen} from '@lfvn-customer/shared/screens';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoanInformationContainer = () => {
  return (
    <SafeAreaView style={tw.style('flex-1')}>
      <LoanInformationScreen />
    </SafeAreaView>
  );
};

export default LoanInformationContainer;
