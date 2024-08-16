'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Platform, View } from 'react-native';

import tw from 'twrnc';
import useSimulateScreen from '@lfvn-customer/shared/hooks/useSimulateScreen';
import { SimulateScreen } from '@lfvn-customer/shared/screens';

export default function Simulate() {
  console.log('Platform.OS', Platform.OS);

  const {
    renderFrom: simulateForm,
    handleSubmit: handleSimulate,
    getValues: getValueSimulate,
  } = useSimulateScreen();

  const t = useTranslations();

  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <SimulateScreen t={t} />
        </View>
      </div>
    </main>
  );
}
