import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Appbar, FormButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

const LoanOfferScreen = () => {
  const t = useTranslations();

  return (
    <View>
      <Appbar labelContent={t('LoanOffer.title')} />
      <View style={tw.style('flex-1 bg-white')}></View>
    </View>
  );
};

export default LoanOfferScreen;
