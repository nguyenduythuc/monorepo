import React, { useEffect } from 'react';
import { View, ImageBackground, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { HomeScreen } from '@lfvn-customer/shared/screens/Home';
import ImageName from '@lfvn-customer/shared/assets/images';

const HomeContainer = () => {
  return (
    <View style={tw.style('flex-1')}>
      <ImageBackground
        source={
          Platform.OS === 'android' ? { uri: 'home_bg' } : ImageName['home_bg']
        }
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')}>
          <HomeScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeContainer;
