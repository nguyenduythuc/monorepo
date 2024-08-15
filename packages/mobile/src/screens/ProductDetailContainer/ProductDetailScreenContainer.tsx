import React from 'react';
import {View, ImageBackground, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {homeBg} from '@lfvn-customer/shared/assets';
import {useTranslations} from 'use-intl';
import {ProductDetailScreen} from '@lfvn-customer/shared/screens';

const ProductDetailScreenContainer = ({route}: {route: any}) => {
  const t = useTranslations();

  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={Platform.OS === 'android' ? {uri: 'home_bg'} : homeBg}
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <ProductDetailScreen t={t} params={route.params} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ProductDetailScreenContainer;
