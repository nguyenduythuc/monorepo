'use client';
import { VerifyESignForSaleScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Appbar } from '@lfvn-customer/shared';

export default function VerifyESignForSale() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <View style={tw.style('pt-2')}>
        <Appbar />
      </View>
      <VerifyESignForSaleScreen />
    </View>
  );
}
