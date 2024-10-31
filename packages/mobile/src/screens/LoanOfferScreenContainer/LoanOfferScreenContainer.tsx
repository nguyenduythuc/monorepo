import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoanOfferScreen} from '@lfvn-customer/shared/screens';

const LoanOfferScreenContainer = () => {
  return (
    <SafeAreaView style={tw.style('flex-1')}>
      <LoanOfferScreen />
    </SafeAreaView>
  );
};

export default LoanOfferScreenContainer;
