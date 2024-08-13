import React from 'react';
import {View, ImageBackground, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {homeBg} from '@lfvn-customer/shared/assets';
import {HomeScreen} from '@lfvn-customer/shared/screens/Home';

const HomeContainer = () => {
  return (
    <View style={tw.style('flex-1')}>
      <ImageBackground
        source={Platform.OS === 'android' ? {uri: 'home_bg'} : homeBg}
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')}>
          <HomeScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeContainer;
