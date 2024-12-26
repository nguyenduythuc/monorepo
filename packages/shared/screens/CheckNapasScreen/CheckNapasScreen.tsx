import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {CustomButton} from '@lfvn-customer/shared/components';
import useCheckNapas from '@lfvn-customer/shared/hooks/useCheckNapas';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

const CheckNapasScreen = () => {
  const t = useTranslations();
  const {renderFrom: simulateForm, onPressSubmit} = useCheckNapas();

  return (
    <>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`px-4 mt-4`}>
          <Text style={tw`text-3xl font-bold`}>
            {t('VerifyIdCardESignForSale.checkNapas')}
          </Text>
          <Text style={tw`text-lg mt-2`}>
            {t('VerifyIdCardESignForSale.checkNapasDesc')}{' '}
          </Text>
          <View style={tw``}>{simulateForm()}</View>
        </View>
      </ScrollView>
      <View style={tw`px-4 pt-3 pb-4 border-t border-gray-200`}>
        <CustomButton onPress={onPressSubmit} color="red">
          {t('Simulate.submit')}
        </CustomButton>
      </View>
    </>
  );
};

export default CheckNapasScreen;
