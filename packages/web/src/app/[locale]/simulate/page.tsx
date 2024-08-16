'use client';
import React from 'react';
import { Platform, View } from 'react-native';

import tw from 'twrnc';
import { SimulateScreen } from '@lfvn-customer/shared/screens';

export default function Simulate() {
  console.log('Platform.OS', Platform.OS);

  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <SimulateScreen />
        </View>
      </div>
    </main>
  );
}
