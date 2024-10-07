import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useHandleLoanInformation from '@lfvn-customer/shared/hooks/useHandleLoanInformation';
import Answer from '../Answers';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {Icon} from '../common';
import {QuestionField} from '@lfvn-customer/shared/types/formTypes';
import {formatNewAmount} from '@lfvn-customer/shared/utils/commonFunction';

const ProductInformation = ({stepNumber, control}: QuestionField) => {
  const {theme} = useGetTheme();
  const {textNegative300, textNegative500} = theme;

  const t = useTranslations();
  const {getStep, getInterest, getEstimate} = useHandleLoanInformation({
    control,
    stepNumber,
  });

  const step = getStep({stepNumber});

  return (
    <ScrollView style={tw.style('flex-1')}>
      <View style={tw.style('flex-1 p-4')}>
        <View style={tw.style('flex-1 mt-1')}>
          <Text
            style={tw.style(`text-[32px] font-semibold ${textNegative500}`)}>
            {t(step.name)}
          </Text>
          <Text style={tw.style(`text-sm ${textNegative300} mt-2`)}>
            {t(step.description)}
          </Text>
          {step?.questions?.map((question, index) => (
            <View key={index} style={tw.style('mt-4')}>
              <Text style={tw.style(`text-lg ${textNegative500}`)}>
                {question.title}
              </Text>
              {question.answers.map((answer, index) => (
                <Answer key={index} answer={answer} control={control} />
              ))}
            </View>
          ))}
          <Text style={tw`text-xl font-bold mt-5`}>
            {t('Simulate.loanEstimate')}
          </Text>

          <View style={tw`flex flex-row justify-around mt-4`}>
            <View
              style={tw`bg-red-100 flex-1 rounded-xl py-2 px-3 items-center`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-base font-semibold pr-2`}>
                  {t('Simulate.monthlyPay')}
                </Text>
                <Icon size={15} color="#E7252B" name="info-icon" />
              </View>
              <Text style={tw`text-xl font-semibold text-red-500`}>
                {formatNewAmount(getEstimate || 0).numberMoneyFormat}{' '}
                <Text style={tw`font-normal text-black`}>
                  {formatNewAmount(getEstimate || 0).currencySymbolVND}
                </Text>
              </Text>
            </View>
            <View style={tw`w-4`} />
            <View
              style={tw`bg-red-100 flex-1 rounded-xl py-2 px-3 items-center`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-base font-semibold pr-2`}>
                  {t('Simulate.interestRate')}
                </Text>
                <Icon size={15} color="#E7252B" name="info-icon" />
              </View>
              <Text style={tw`text-xl font-semibold text-red-500`}>
                {getInterest || '0'}%
                <Text style={tw`font-normal text-black`}>
                  /{t('Simulate.year')}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductInformation;
