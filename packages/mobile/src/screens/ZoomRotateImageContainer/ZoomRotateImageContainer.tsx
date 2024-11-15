import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Appbar} from '@lfvn-customer/shared/components';
import {ZoomRotateImageScreen} from '@lfvn-customer/shared/screens';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ZoomRotateImageScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';
import {useRoute} from '@react-navigation/native';

const ZoomRotateImageContainer = () => {
  const route = useRoute<ZoomRotateImageScreenRouteProps>();

  const {uri} = route.params;

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={tw.style('flex-1')}>
        <Appbar />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <ZoomRotateImageScreen uri={uri} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ZoomRotateImageContainer;
