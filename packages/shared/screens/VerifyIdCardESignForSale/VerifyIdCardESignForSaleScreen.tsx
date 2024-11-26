import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import useVerifyIdCardESignForSale from '../../hooks/useVerifyIdCardESignForSale';

const VerifyIdCardESignForSaleScreen = ({
  tokenEsign,
  saleImportId,
}: {
  tokenEsign: string;
  saleImportId: string;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const {renderFrom, onPressSubmit} = useVerifyIdCardESignForSale({
    tokenEsign,
    saleImportId,
  });

  return (
    <>
      <ScrollView style={tw`flex-1`}>
        <View style={tw.style('px-4')}>
          <Text
            style={tw.style(`text-32px ${textNegative500} font-semibold mt-6`)}>
            {t('VerifyIdCardESignForSale.title')}
          </Text>
          <Text style={tw.style(`text-lg ${textNegative500} mt-2`)}>
            {t('VerifyIdCardESignForSale.desc')}
          </Text>
          <View style={tw.style('')}>{renderFrom()}</View>
        </View>
      </ScrollView>
      <View style={tw.style('border-t border-gray-200')}>
        <CustomButton
          onPress={onPressSubmit}
          color={'red'}
          buttonStyle={'mt-4 mx-4'}>
          {t('VerifyIdCardESignForSale.continue')}
        </CustomButton>
      </View>
    </>
  );
};

export default VerifyIdCardESignForSaleScreen;
