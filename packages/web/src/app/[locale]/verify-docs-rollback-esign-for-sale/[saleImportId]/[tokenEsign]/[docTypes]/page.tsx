'use client';
import { VerifyDocsRollbackESignForSaleScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { usePathname } from 'next/navigation';

export default function VerifyDocsRollbackESignForSaleContainer() {
  const pathname = usePathname();
  const pathParts = pathname?.split('/') || [];
  const docTypes = pathParts[pathParts.length - 1];
  const tokenEsign = pathParts[pathParts.length - 2];
  const saleImportId = pathParts[pathParts.length - 3];

  return (
    <View style={tw.style('flex-1 pb-2 bg-white h-full')}>
      <VerifyDocsRollbackESignForSaleScreen
        tokenEsign={tokenEsign}
        saleImportId={saleImportId}
        docTypes={docTypes}
      />
    </View>
  );
}
