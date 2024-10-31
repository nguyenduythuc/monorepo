'use client';
import { AppbarBackAction, ReviewLoanOfferScreen } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { View } from 'react-native';

export default function ReviewLoanOffer() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <AppbarBackAction containerStyle="mx-2 mt-4" />
      <View style={tw.style('flex-1 pt-2')}>
        <ReviewLoanOfferScreen />
      </View>
    </View>
  );
}
