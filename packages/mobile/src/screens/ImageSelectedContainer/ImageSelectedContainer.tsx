import React from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {ImageSelectedScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {ImageSelectedScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const ImageSelectedContainer = () => {
  const route = useRoute<ImageSelectedScreenRouteProps>();

  const {folderEncoded} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <ImageSelectedScreen folderEncoded={folderEncoded} />
    </View>
  );
};

export default ImageSelectedContainer;
