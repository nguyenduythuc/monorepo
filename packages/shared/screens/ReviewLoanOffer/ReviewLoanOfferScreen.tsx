import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CustomButton, IconKeys} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {InfoDataCard} from '../../components/common/InfoDataCard';
import useReviewLoanOffer from '../../hooks/useReviewLoanOffer';
import {useGetTheme} from '../../hooks/useGetTheme';

export type DescriptionInfo = {
  icon: IconKeys;
  description: string;
  hightlight: string;
};

const ReviewLoanOfferScreen = () => {
  const t = useTranslations();

  const {handleConfirmLoanOffer, cardRawData} = useReviewLoanOffer();
  const {theme} = useGetTheme();
  const {textUseful500} = theme;

  const displayLoanOfferData = useMemo(() => {
    const displayData = cardRawData
      ? {
          untitled: {
            loanProduct: cardRawData?.loanProduct,
            loanAmount: cardRawData?.loanAmount,
            loanTenor: cardRawData?.loanTenor,
            interestMonthly: cardRawData?.interestMonthly,
            interestRate: cardRawData?.interestRate,
            loanInsuranceFee: cardRawData?.loanInsuranceFee,
          },
        }
      : cardRawData;
    return displayData;
  }, [cardRawData]);

  return (
    <>
      <View style={tw.style('flex-1 pb-24')}>
        <View style={tw.style('mx-4 my-4')}>
          <Text style={tw.style('text-[32px] font-semibold')}>
            {t('ReviewLoanOffer.title')}
          </Text>
          <Text style={tw.style('text-lg mt-2')}>
            {t('ReviewLoanOffer.desc')}
          </Text>
        </View>
        <View style={tw.style('mx-4')}>
          <InfoDataCard cardRawData={displayLoanOfferData} />
        </View>
        <View style={tw.style('mx-4')}>
          <Text style={tw.style(`text-lg mt-2 ${textUseful500}`)}>
            {t('ReviewLoanOffer.confirmTitle')}
          </Text>
        </View>
      </View>
      <View
        style={tw`flex-row w-full gap-3 justify-between px-4 py-3 border-t border-gray-200 absolute bottom-0`}>
        <View style={tw.style('flex-1')}>
          <CustomButton
            onPress={() => handleConfirmLoanOffer(false)}
            // buttonStyle={`bg-white`}
            textCustomStyle={`text-blue-500`}>
            {t('ReviewLoanOffer.editLoanInfo')}
          </CustomButton>
        </View>
        <View style={tw.style('flex-1')}>
          <CustomButton
            onPress={() => handleConfirmLoanOffer(true)}
            color="red">
            {t('ReviewLoanOffer.confirm')}
          </CustomButton>
        </View>
      </View>
    </>
  );
};

export default ReviewLoanOfferScreen;
