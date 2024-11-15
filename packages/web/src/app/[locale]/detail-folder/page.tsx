'use client';
import { DetailFolderScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { useSearchParams } from 'next/navigation';

export default function VerifyESignForSale() {
  const searchParams = useSearchParams();

  const folderEncoded = searchParams.get('folderEncoded') ?? '';
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <DetailFolderScreen folderEncoded={folderEncoded} />
    </View>
  );
}
