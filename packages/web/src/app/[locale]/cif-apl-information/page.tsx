'use client';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { CifAndAplInformation } from '@lfvn-customer/shared/screens';
import { useSearchParams } from 'next/navigation';

export default function CifAndAplInformationScreen() {
  const searchParams = useSearchParams();

  const flowId = searchParams.get('flowId') ?? '';

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <CifAndAplInformation flowId={flowId} />
    </View>
  );
}
