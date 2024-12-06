import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useHandleLoanInformation from '@lfvn-customer/shared/hooks/useHandleLoanInformation';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {QuestionField} from '@lfvn-customer/shared/types/formTypes';
import Answer from '../Answers';

const InsuranceDuration = ({stepNumber, control}: QuestionField) => {
  const {theme} = useGetTheme();
  const {textNegative300, textNegative500} = theme;

  const t = useTranslations();
  const {getStep} = useHandleLoanInformation({control, stepNumber});

  const step = getStep({stepNumber});

  return (
    <ScrollView style={tw.style('flex-1')}>
      <View style={tw.style('flex-1 p-4')}>
        <View style={tw.style('flex-1 mt-1')}>
          <Text style={tw.style(`text-sm ${textNegative300} mt-2`)}>
            {t(step.description)}
          </Text>
          <Text
            style={tw.style(`text-[32px] font-semibold ${textNegative500}`)}>
            {t(step.name)}
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
        </View>
      </View>
    </ScrollView>
  );
};

export default InsuranceDuration;
