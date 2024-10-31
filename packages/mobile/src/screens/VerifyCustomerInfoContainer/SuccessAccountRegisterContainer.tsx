import React from 'react';
import {View, ImageBackground, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {homeBg} from '@lfvn-customer/shared/assets';
import {SuccessAccountRegister} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {SuccessAccountRegisterScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';

export const SuccessAccountRegisterContainer = () => {
  const route = useRoute<SuccessAccountRegisterScreenRouteProps>();

  const {phoneNumber, identityNumber} = route.params;

  return (
    <View style={tw.style('flex-1')}>
      <ImageBackground
        source={Platform.OS === 'android' ? {uri: 'home_bg'} : homeBg}
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')}>
          <SuccessAccountRegister
            phoneNumber={phoneNumber}
            identityNumber={identityNumber}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default SuccessAccountRegisterContainer;
