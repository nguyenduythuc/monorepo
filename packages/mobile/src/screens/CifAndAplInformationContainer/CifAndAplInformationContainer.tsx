import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CifAndAplInformation} from '@lfvn-customer/shared/screens';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {CifAndAplInformationRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const CifAndAplInformationContainer = () => {
  const route = useRoute<CifAndAplInformationRouteProps>();

  return (
    <SafeAreaView style={tw.style('flex-1 bg-white')}>
      <CifAndAplInformation flowId={route.params.flowId} />
    </SafeAreaView>
  );
};

export default CifAndAplInformationContainer;
