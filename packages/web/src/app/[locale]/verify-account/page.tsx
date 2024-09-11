'use client';
import { Appbar, VerifyAccountScreen } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { OTPTypesEnum } from '@lfvn-customer/shared/types';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { View } from 'react-native';

export default function VerifyAccount() {
  const searchParams = useSearchParams();

  const type = (searchParams.get('type') ?? '') as OTPTypesEnum;
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <Script src="/trueidsdk/TrueIDSDK.js" strategy="lazyOnload" />
      <Appbar />
      <View style={tw.style('pt-2')}>
        <VerifyAccountScreen type={type} />
      </View>
    </View>
  );
}
