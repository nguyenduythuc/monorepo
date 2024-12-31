'use client';
import { ListNapasBankScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export default function ListNapasBankContainer() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <ListNapasBankScreen />
    </View>
  );
}
