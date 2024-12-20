'use client';
import { CustomCameraScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { useSearchParams } from 'next/navigation';
import { ESignForSaleDocType } from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

export default function CustomCameraContainer() {
  const searchParams = useSearchParams();

  const docType = searchParams.get('docType') ?? '';
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <CustomCameraScreen docType={docType as ESignForSaleDocType} />
    </View>
  );
}
