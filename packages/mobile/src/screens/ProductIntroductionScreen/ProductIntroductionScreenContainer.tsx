import React from 'react';
import {View, ImageBackground, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {bgLogin} from '@lfvn-customer/shared/assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ProductIntroductionScreen} from '@lfvn-customer/shared/screens/ProductIntroduction';
import {useTranslations} from 'use-intl';

const ProductIntroductionScreenContainer = () => {
  const t = useTranslations();

  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={Platform.OS === 'android' ? {uri: 'login_bg'} : bgLogin}
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <ProductIntroductionScreen t={t} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ProductIntroductionScreenContainer;
