'use client';
import { SuccessAccountRegister } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { useSearchParams } from 'next/navigation';
import { View } from 'react-native';

export default function VerifyAccount() {
  const searchParams = useSearchParams();

  const phoneNumber = searchParams.get('phoneNumber') ?? '';
  const identityNumber = searchParams.get('identityNumber') ?? '';

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <img
        style={tw.style(`absolute`)}
        src="/images/home_bg.png"
        alt="My Image"
      />
      <View style={tw.style('pt-2')}>
        <SuccessAccountRegister
          phoneNumber={phoneNumber}
          identityNumber={identityNumber}
        />
      </View>
    </View>
  );
}
