import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {ImageBackground} from '@lfvn-customer/shared/components';
import {PreScoringPendingCheckScreen} from '@lfvn-customer/shared/screens';

const PreScoringPendingCheckContainer = () => {
  return (
    <View style={tw.style('flex-1')}>
      <ImageBackground iconName="home_bg">
        <SafeAreaView style={tw.style('flex-1')}>
          <PreScoringPendingCheckScreen />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default PreScoringPendingCheckContainer;
