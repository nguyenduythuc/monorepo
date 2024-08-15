import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {RepaymentScheduleScreen} from '@lfvn-customer/shared/screens';
import {useTranslations} from 'use-intl';

export const RepaymentScheduleScreenContainer = () => {
  const t = useTranslations();

  return (
    <View style={tw`h-screen bg-white`}>
      <SafeAreaView style={tw`h-screen`}>
        <RepaymentScheduleScreen t={t} />
      </SafeAreaView>
    </View>
  );
};

export default RepaymentScheduleScreenContainer;
