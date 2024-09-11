import React from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

const IncomePerMonth = () => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative300, textNegative500} = theme;

  return (
    <View style={tw.style('flex-1 p-4')}>
      <Text style={tw.style(`text-sm ${textNegative300}`)}>
        {t('Step.addMoreInformation')}
      </Text>
      <View style={tw.style('flex-1 mt-1')}>
        <Text style={tw.style(`text-[32px] font-semibold ${textNegative500}`)}>
          {t('IncomePerMonth.title')}
        </Text>
      </View>
    </View>
  );
};

export default IncomePerMonth;
