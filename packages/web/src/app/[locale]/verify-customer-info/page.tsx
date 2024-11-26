'use client';
import { VerifyCustomerInfo } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { View } from 'react-native';

export default function VerifyAccount() {
  return (
    <View style={tw.style('flex-1 pb-2 bg-white h-full')}>
      <VerifyCustomerInfo />
    </View>
  );
}
