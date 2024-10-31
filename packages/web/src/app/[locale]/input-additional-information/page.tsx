'use client';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { InputAdditionalInformation } from '@lfvn-customer/shared/screens';

export default function InputAdditionalInformationScreen() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <InputAdditionalInformation />
    </View>
  );
}
