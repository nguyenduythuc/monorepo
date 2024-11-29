'use client';
import { SignContractESignForSaleSuccessScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Appbar } from '@lfvn-customer/shared';
import { useSearchParams } from 'next/navigation';

export default function SignContractESignForSaleSuccessContainer() {
  const searchParams = useSearchParams();
  const uri = searchParams.get('uri') ?? '';

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <View style={tw.style('pt-2')}>
        <Appbar />
      </View>
      <SignContractESignForSaleSuccessScreen uri={uri} />
    </View>
  );
}
