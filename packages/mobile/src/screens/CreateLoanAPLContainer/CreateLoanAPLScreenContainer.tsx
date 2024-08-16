import React from 'react';
import {View, ImageBackground, Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {createLoanAplBg} from '@lfvn-customer/shared/assets';
import {useTranslations} from 'use-intl';
import {CreateLoanAPLScreen} from '@lfvn-customer/shared/screens';
const CreateLoanAPLScreenContainer = () => {
  const t = useTranslations();

  return (
    <View style={tw.style('flex-1')}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={
          Platform.OS === 'android' ? {uri: 'create_loan_bg'} : createLoanAplBg
        }
        style={tw.style('flex-1')}>
        <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
          <CreateLoanAPLScreen t={t} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default CreateLoanAPLScreenContainer;
