'use client';
import { Image } from '@lfvn-customer/shared/components';
import { CifInfoPendingCheckScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { useSearchParams } from 'next/navigation';

export default function CifInfoPendingCheck() {
  const searchParams = useSearchParams();

  const flowId = searchParams.get('flowId') ?? '';
  const productCode = searchParams.get('productCode') ?? '';

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <Image iconName="home_bg" style={tw.style(`absolute`)} />
      <CifInfoPendingCheckScreen flowId={flowId} productCode={productCode} />
    </View>
  );
}
