'use client';
import { Appbar, VerifyCustomerInfo } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { View } from 'react-native';

export default function VerifyAccount() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <Appbar />
      <View style={tw.style('pt-2')}>
        <VerifyCustomerInfo />
      </View>
    </View>
  );
}
