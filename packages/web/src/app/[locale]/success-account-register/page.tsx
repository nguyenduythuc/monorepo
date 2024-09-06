'use client';
import { Appbar, SuccessAccountRegister } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { View } from 'react-native';

export default function VerifyAccount() {
  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <img
        style={tw.style(`absolute`)}
        src="/images/home_bg.png"
        alt="My Image"
      />
      <View style={tw.style('pt-2')}>
        <SuccessAccountRegister />
      </View>
    </View>
  );
}
