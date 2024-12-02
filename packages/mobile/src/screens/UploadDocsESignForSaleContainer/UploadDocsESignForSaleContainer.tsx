import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {UploadDocsESignForSaleScreen} from '@lfvn-customer/shared/screens';

const UploadDocsESignForSaleContainer = () => {
  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <UploadDocsESignForSaleScreen />
      </SafeAreaView>
    </View>
  );
};

export default UploadDocsESignForSaleContainer;
