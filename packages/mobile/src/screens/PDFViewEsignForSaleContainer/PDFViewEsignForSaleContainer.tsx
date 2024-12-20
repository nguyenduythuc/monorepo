import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {PDFViewEsignForSaleScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {PDFViewScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const PDFViewEsignForSaleContainer = () => {
  const route = useRoute<PDFViewScreenRouteProps>();
  const {docType} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <PDFViewEsignForSaleScreen docType={docType} />
      </SafeAreaView>
    </View>
  );
};

export default PDFViewEsignForSaleContainer;
