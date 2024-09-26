'use client';
import { Appbar, ReviewCustomerEKYCInfo } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { View } from 'react-native';

export default function VerifyAccount() {
  return (

    <View
      style={tw`flex bg-white min-h-screen pt-10 flex-col items-center justify-between`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <ReviewCustomerEKYCInfo />
        </View>
      </div>
    </View>
  );
}
