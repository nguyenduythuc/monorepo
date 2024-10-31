import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {InputAdditionalInformation} from '@lfvn-customer/shared/screens';
import {SafeAreaView} from 'react-native-safe-area-context';

const InputAdditionalInformationContainer = () => {
  return (
    <SafeAreaView style={tw.style('flex-1')}>
      <InputAdditionalInformation />
    </SafeAreaView>
  );
};

export default InputAdditionalInformationContainer;
