import React from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {DetailFolderEsignForSaleScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {DetailFolderEsignForSaleScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const DetailFolderEsignForSaleContainer = () => {
  const route = useRoute<DetailFolderEsignForSaleScreenRouteProps>();

  const {docType} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <DetailFolderEsignForSaleScreen docType={docType} />
    </View>
  );
};

export default DetailFolderEsignForSaleContainer;
