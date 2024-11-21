'use client';
import { VerifyIdCardESignForSaleScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { usePathname } from 'next/navigation';

export default function VerifyESignForSale() {
  const pathname = usePathname();
  const pathParts = pathname?.split('/') || [];
  const tokenEsign = pathParts[pathParts.length - 1];
  const saleImportId = pathParts[pathParts.length - 2];

  return (
    <View style={tw.style('flex-1 pb-2 bg-white h-full')}>
      <VerifyIdCardESignForSaleScreen
        tokenEsign={tokenEsign}
        saleImportId={saleImportId}
      />
    </View>
  );
}
