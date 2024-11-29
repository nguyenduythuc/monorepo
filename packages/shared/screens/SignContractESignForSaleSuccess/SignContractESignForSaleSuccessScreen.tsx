import React from 'react';
import {View, Text, Platform} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

const SignContractESignForSaleSuccessScreen = ({uri}: {uri: string}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const {appNavigate} = useConfigRouting();

  const onPressGoHome = () => {
    appNavigate(ScreenParamEnum.Home);
  };

  const onPressDownloadContract = () => {
    if (Platform.OS === 'web') {
      const link = document.createElement('a');
      link.href = uri!;
      link.download = 'contract.pdf';
      link.click();
    } else {
      // todo: mobile
    }
  };

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('px-4')}>
        <Text
          style={tw.style(`text-[34px] ${textNegative500} font-semibold mt-6`)}>
          {t('SignContractESignForSaleSuccess.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-2 `)}>
          {t('SignContractESignForSaleSuccess.desc')}
        </Text>
      </View>
      <View style={tw.style('absolute flex-row bottom-4 w-full px-4')}>
        <View style={tw.style('flex-1 mr-3')}>
          <CustomButton
            onPress={onPressDownloadContract}
            buttonStyle={'bg-[#2F6BFF] flex-1'}
            textCustomStyle={'text-white'}>
            {t('SignContractESignForSaleSuccess.downloadContract')}
          </CustomButton>
        </View>
        <View style={tw.style('flex-1')}>
          <CustomButton
            buttonStyle={'bg-[#E7252B] flex-1'}
            textCustomStyle={'text-white'}
            onPress={onPressGoHome}>
            {t('SignContractESignForSaleSuccess.home')}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default SignContractESignForSaleSuccessScreen;
