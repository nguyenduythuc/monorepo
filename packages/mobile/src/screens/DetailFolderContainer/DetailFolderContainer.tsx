import React from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {DetailFolderScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {DetailFolderScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const DetailFolderContainer = () => {
  const route = useRoute<DetailFolderScreenRouteProps>();

  const {folderEncoded} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white h-full')}>
      <DetailFolderScreen folderEncoded={folderEncoded} />
    </View>
  );
};

export default DetailFolderContainer;
