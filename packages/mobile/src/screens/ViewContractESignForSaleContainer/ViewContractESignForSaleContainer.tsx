import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {ViewContractESignForSaleScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {ViewContractEsignForSaleScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const ViewContractESignForSaleContainer = () => {
  const route = useRoute<ViewContractEsignForSaleScreenRouteProps>();
  const {uri, isVerifyEKYC, isSignSuccess} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <ViewContractESignForSaleScreen
          uri={uri}
          isVerifyEKYC={isVerifyEKYC}
          isSignSuccess={isSignSuccess}
        />
      </SafeAreaView>
    </View>
  );
};

export default ViewContractESignForSaleContainer;
