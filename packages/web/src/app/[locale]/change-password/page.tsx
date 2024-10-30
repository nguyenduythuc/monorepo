'use client';
import { AppbarBackAction, ChangePasswordScreen } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { useSearchParams } from 'next/navigation';
import { View } from 'react-native';

export default function ChangePassword() {
  const searchParams = useSearchParams();

  const phoneNumber = searchParams.get('phoneNumber') ?? '';
  const identityNumber = searchParams.get('identityNumber') ?? '';

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <AppbarBackAction containerStyle="mx-2 mt-4" />
      <View style={tw.style('pt-2')}>
        <ChangePasswordScreen
          phoneNumber={phoneNumber}
          identityNumber={identityNumber}
        />
      </View>
    </View>
  );
}
