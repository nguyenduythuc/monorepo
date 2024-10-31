'use client';
import { Image } from '@lfvn-customer/shared/components';
import { PreScoringPendingCheckScreen } from '@lfvn-customer/shared/screens';
import React from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export default function PreScoringPendingCheck() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <Image iconName="home_bg" style={tw.style(`absolute`)} />
      <PreScoringPendingCheckScreen />
    </View>
  );
}
