import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {InputAdditionalInformation} from '@lfvn-customer/shared/screens';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {InputAdditionalInformationRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const InputAdditionalInformationContainer = () => {
  const route = useRoute<InputAdditionalInformationRouteProps>();
  return (
    <SafeAreaView style={tw.style('flex-1')}>
      <InputAdditionalInformation currentStep={route.params.currentStep} />
    </SafeAreaView>
  );
};

export default InputAdditionalInformationContainer;
