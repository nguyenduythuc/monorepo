'use client';
import React from 'react';
import { View } from 'react-native';

import tw from 'twrnc';
import { LoanInformationScreen } from '@lfvn-customer/shared/screens';

export default function LoanInformation() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <LoanInformationScreen />
    </View>
  );
}
