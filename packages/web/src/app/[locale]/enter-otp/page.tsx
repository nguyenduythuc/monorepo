'use client';
import { Appbar, EnterOTPScreen } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { View } from 'react-native';
import { useSearchParams } from 'next/navigation';
import { OTPTypesEnum } from '@lfvn-customer/shared/types';

export default function EnterOTP() {
  const searchParams = useSearchParams();

  const authSeq = searchParams.get('authSeq') ?? '';
  const phoneNumber = searchParams.get('phoneNumber') ?? '';
  const identityNumber = searchParams.get('identityNumber') ?? '';
  const type = (searchParams.get('type') ?? '') as OTPTypesEnum;
  const newPassword = searchParams.get('newPassword') ?? '';
  const currentPassword = searchParams.get('currentPassword') ?? '';

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <View style={tw.style('pt-2')}>
        <Appbar />
        <EnterOTPScreen
          authSeq={authSeq}
          phoneNumber={phoneNumber}
          identityNumber={identityNumber}
          type={type}
          newPassword={newPassword}
          currentPassword={currentPassword}
        />
      </View>
    </View>
  );
}
