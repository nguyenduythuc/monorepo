import React from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

const ViewContractESignForSaleScreen = ({uri}: {uri: string}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('px-4')}>
        <Text
          style={tw.style(`text-32px ${textNegative500} font-semibold mt-6`)}>
          {t('VerifyIdContractESignForSale.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-2`)}>
          {t('VerifyIdContractESignForSale.desc')}
        </Text>
      </View>
      <View style={tw.style('mx-4 ')}></View>
      <View style={tw.style('absolute bottom-4 w-full')}>
        <CustomButton
          onPress={() => {}}
          color={'red'}
          buttonStyle={'mt-4 mx-4'}>
          {t('VerifyIdContractESignForSale.continue')}
        </CustomButton>
      </View>
    </View>
  );
};

export default ViewContractESignForSaleScreen;
