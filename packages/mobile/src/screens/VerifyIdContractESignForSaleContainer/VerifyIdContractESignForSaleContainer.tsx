import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {VerifyIdContractESignForSaleScreen} from '@lfvn-customer/shared/screens';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';
import {VerifyIdContractEsignForSaleScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const VerifyIdContractESignForSaleContainer = () => {
  const route = useRoute<VerifyIdContractEsignForSaleScreenRouteProps>();
  const {tokenEsign, saleImportId} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <VerifyIdContractESignForSaleScreen
            tokenEsign={tokenEsign}
            saleImportId={saleImportId}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default VerifyIdContractESignForSaleContainer;
