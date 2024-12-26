import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {VerifyDocsRollbackESignForSaleScreen} from '@lfvn-customer/shared/screens';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';
import {VerifyDocsRollbackEsignForSaleScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const VerifyDocsRollbackESignForSaleContainer = () => {
  const route = useRoute<VerifyDocsRollbackEsignForSaleScreenRouteProps>();
  const {tokenEsign, saleImportId, docTypes} = route.params;

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
          contentContainerStyle={tw.style('flex-1')}
          keyboardShouldPersistTaps="handled">
          <VerifyDocsRollbackESignForSaleScreen
            tokenEsign={tokenEsign}
            saleImportId={saleImportId}
            docTypes={docTypes}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default VerifyDocsRollbackESignForSaleContainer;
