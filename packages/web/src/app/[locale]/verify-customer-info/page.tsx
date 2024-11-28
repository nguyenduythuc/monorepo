'use client';
import { VerifyCustomerInfo } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { OTPTypes } from '@lfvn-customer/shared/types';
import { useSearchParams } from 'next/navigation';
import { View } from 'react-native';

export default function VerifyAccount() {
  const searchParams = useSearchParams();

  const type = searchParams.get('type') as OTPTypes;

  return (
    <View style={tw.style('flex-1 pb-2 bg-white h-full')}>
      <VerifyCustomerInfo type={type} />
    </View>
  );
}
