import React from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CustomCameraScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {CustomCameraScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const CustomCameraContainer = () => {
  const route = useRoute<CustomCameraScreenRouteProps>();

  const {docType} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <CustomCameraScreen docType={docType} />
    </View>
  );
};

export default CustomCameraContainer;
