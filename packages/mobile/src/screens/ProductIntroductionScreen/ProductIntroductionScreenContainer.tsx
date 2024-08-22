import React from 'react';
import {View, ImageBackground, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {ProductIntroductionScreen} from '@lfvn-customer/shared/screens/ProductIntroduction';
import {useTranslations} from 'use-intl';
import ImageName from '@lfvn-customer/shared/assets/images';

const ProductIntroductionScreenContainer = () => {
  const t = useTranslations();

  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={
          Platform.OS === 'android' ? {uri: 'login_bg'} : ImageName['login_bg']
        }
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <ProductIntroductionScreen t={t} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ProductIntroductionScreenContainer;
