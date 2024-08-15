import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {SimulateScreen} from '@lfvn-customer/shared/screens';
import {useTranslations} from 'use-intl';

export const SimulateScreenContainer = () => {
  const t = useTranslations();

  return (
    <View style={tw`flex-1 bg-white`}>
      <SafeAreaView style={tw`flex-1`}>
        <SimulateScreen t={t} />
      </SafeAreaView>
    </View>
  );
};

export default SimulateScreenContainer;
