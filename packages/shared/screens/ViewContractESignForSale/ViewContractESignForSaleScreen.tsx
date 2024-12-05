import React from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import PDFView from 'react-native-pdf';
import useViewContractESignForSale from '../../hooks/useViewContractESignForSale';

const ViewContractESignForSaleScreen = ({
  uri,
  isVerifyEKYC,
  isSignSuccess,
}: {
  uri: string;
  isVerifyEKYC?: boolean;
  isSignSuccess?: boolean;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  console.log('isVerifyEKYC', isVerifyEKYC);
  console.log('isSignSuccess', isSignSuccess);

  const {onPressSubmit} = useViewContractESignForSale();

  const renderFile = () => {
    if (uri) {
      return (
        <PDFView
          source={{uri: uri}}
          style={tw.style('w-full h-full')}
          onError={error => console.error('PDF error:', error)}
        />
      );
    }
    return <View />;
  };

  return (
    <>
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
        <View style={tw.style('px-2 pb-30')}>{renderFile()}</View>

        <View style={tw.style('mx-4 ')}></View>
      </View>
      <View style={tw`pb-4 border-t border-gray-200 bg-white`}>
        <CustomButton
          onPress={onPressSubmit}
          color={'red'}
          buttonStyle={'mt-4 mx-4'}>
          {t('VerifyIdContractESignForSale.continue')}
        </CustomButton>
      </View>
    </>
  );
};

export default ViewContractESignForSaleScreen;
