import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {VerifyIdCardESignForSaleScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {VerifyIdCardEsignForSaleScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const VerifyIdCardESignForSaleContainer = () => {
  const route = useRoute<VerifyIdCardEsignForSaleScreenRouteProps>();
  const {tokenEsign, saleImportId} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <VerifyIdCardESignForSaleScreen
          tokenEsign={tokenEsign}
          saleImportId={saleImportId}
        />
      </SafeAreaView>
    </View>
  );
};

export default VerifyIdCardESignForSaleContainer;
