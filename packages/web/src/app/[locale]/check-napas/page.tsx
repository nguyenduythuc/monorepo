'use client';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { CheckNapasScreen } from '@lfvn-customer/shared/screens';

export default function CifAndAplInformationScreen() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <CheckNapasScreen />
    </View>
  );
}
