'use client';
import { PDFViewEsignForSaleScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { useSearchParams } from 'next/navigation';
import { ESignForSaleDocType } from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

export default function PDFViewEsignForSaleContainer() {
  const searchParams = useSearchParams();

  const docType = searchParams.get('docType') ?? '';
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <PDFViewEsignForSaleScreen docType={docType as ESignForSaleDocType} />
    </View>
  );
}
