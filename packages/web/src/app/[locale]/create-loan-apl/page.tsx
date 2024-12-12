'use client';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { CreateLoanAPLScreen } from '@lfvn-customer/shared/screens';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

export default function CreateLoanApl() {
  const t = useTranslations();

  return (
    <View
      style={tw`flex bg-white min-h-screen flex-col items-center justify-between`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <img
            style={tw.style(`absolute`)}
            src="/images/create_loan_apl_bg.png"
            alt="My Image"
          />
          <CreateLoanAPLScreen t={t} />
        </View>
      </div>
    </View>
  );
}
