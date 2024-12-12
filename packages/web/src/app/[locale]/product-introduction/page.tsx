'use client';
import React from 'react';
import { Platform, View } from 'react-native';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

import tw from 'twrnc';
import { ProductIntroductionScreen } from '@lfvn-customer/shared/screens/ProductIntroduction';

export default function ProductIntroduction() {
  console.log('Platform.OS', Platform.OS);

  const t = useTranslations();

  return (
    <View
      style={tw`flex bg-white min-h-screen flex-col items-center justify-between`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <img
            style={tw.style(`absolute`)}
            src="/images/login_bg.png"
            alt="My Image"
          />
          <ProductIntroductionScreen t={t} />
        </View>
      </div>
    </View>
  );
}
