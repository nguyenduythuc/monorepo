import React, {useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {QuestionField} from '@lfvn-customer/shared/types/formTypes';
import Answer from '../Answers';
import useHandleRBPInformation from '../../hooks/useHandleRBPInformation';

const ResidentAddress = ({stepNumber, control, watch}: QuestionField) => {
  const {theme} = useGetTheme();
  const {textNegative300, textNegative500} = theme;

  const t = useTranslations();
  const {getStep} = useHandleRBPInformation({
    control,
    stepNumber,
  });

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
            <View key={index}>
              <Text style={tw.style(`text-lg ${textNegative500}`)}>
                {question.title}
              </Text>
              {question.answers.map((answer, index) => (
                <View key={index} style={tw.style('mt-4')}>
                  <Answer key={index} answer={answer} control={control} />
                </View>
              ))}
            </View>
          ))}
          {/* {getResidentDuration && (
            <Text style={tw.style('text-right mt-2')}>
              {getResidentDuration?.years +
                ' years ' +
                getResidentDuration?.months +
                ' months '}
            </Text>
          )} */}
        </View>
      </View>
    </ScrollView>
  );
};

export default ResidentAddress;
