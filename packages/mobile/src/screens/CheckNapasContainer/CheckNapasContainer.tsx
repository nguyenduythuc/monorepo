import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CheckNapasScreen} from '@lfvn-customer/shared/screens';

const CheckNapasContainer = () => {
  return (
    <View style={tw.style('flex-1 bg-white')}>
      <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
        <CheckNapasScreen />
      </SafeAreaView>
    </View>
  );
};

export default CheckNapasContainer;
