import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Appbar} from '@lfvn-customer/shared/components';
import {DetailFolderScreen} from '@lfvn-customer/shared/screens';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
