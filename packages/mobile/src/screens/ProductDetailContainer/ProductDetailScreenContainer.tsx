import React from 'react';
import {View, ImageBackground, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useTranslations} from 'use-intl';
import {ProductDetailScreen} from '@lfvn-customer/shared/screens';
import {useRoute} from '@react-navigation/native';
import {ProductDetailScreenRouteProps} from '@lfvn-customer/shared/types/paramtypes';
import ImageName from '@lfvn-customer/shared/assets/images';

const ProductDetailScreenContainer = () => {
  const t = useTranslations();

  const route = useRoute<ProductDetailScreenRouteProps>();

  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={
          Platform.OS === 'android' ? {uri: 'home_bg'} : ImageName['home_bg']
        }
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <ProductDetailScreen t={t} params={route.params} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ProductDetailScreenContainer;
