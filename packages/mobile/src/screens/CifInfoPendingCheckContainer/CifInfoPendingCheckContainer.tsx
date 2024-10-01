import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {ImageBackground} from '@lfvn-customer/shared/components';
import {CifInfoPendingCheckScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {CifInfoPendingCheckScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

const CifInfoPendingCheckContainer = () => {
  const route = useRoute<CifInfoPendingCheckScreenRouteProps>();

  return (
    <View style={tw.style('flex-1')}>
      <ImageBackground iconName="home_bg">
        <SafeAreaView style={tw.style('flex-1')}>
          <CifInfoPendingCheckScreen
            flowId={route.params.flowId}
            productCode={route.params.productCode}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default CifInfoPendingCheckContainer;
