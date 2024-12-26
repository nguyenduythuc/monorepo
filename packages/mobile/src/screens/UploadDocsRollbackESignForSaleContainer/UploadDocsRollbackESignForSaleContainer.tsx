import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {UploadDocsRollbackESignForSaleScreen} from '@lfvn-customer/shared/screens';

const UploadDocsRollbackESignForSaleContainer = () => {
  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <UploadDocsRollbackESignForSaleScreen />
      </SafeAreaView>
    </View>
  );
};

export default UploadDocsRollbackESignForSaleContainer;
