import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {VisionCamera} from '@lfvn-customer/shared/screens';
import {VisionCameraRouteProps} from '@lfvn-customer/shared/types/paramtypes';
import {useRoute} from '@react-navigation/native';

export const VisionCameraContainer = () => {
  const route = useRoute<VisionCameraRouteProps>();
  const {doc, setDoc} = route.params;
  return (
    <View style={tw.style('flex-1 bg-black')}>
      <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
        <VisionCamera doc={doc} setDoc={setDoc} />
      </SafeAreaView>
    </View>
  );
};

export default VisionCameraContainer;
