import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {VerifyCustomerInfo} from '@lfvn-customer/shared/screens';
import {VerifyCustomerInfoRouteProps} from '@lfvn-customer/shared/types/paramtypes';
import {useRoute} from '@react-navigation/native';

export const VerifyCustomerInfoContainer = () => {
  const route = useRoute<VerifyCustomerInfoRouteProps>();

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
        <VerifyCustomerInfo type={route?.params?.type} />
      </SafeAreaView>
    </View>
  );
};

export default VerifyCustomerInfoContainer;
