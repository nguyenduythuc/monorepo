import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {RadioButton} from '../common';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

const RadioButtonAnswer = ({
  answer,
  control,
}: {
  answer: AnswerProps;
  control: Control;
}) => {
  const t = useTranslations();

  const options = answer?.options ?? [];
  return (
    <Controller
      key={answer.name}
      control={control}
      name={answer.name}
      defaultValue={answer.value}
      render={({field: {onChange, value}}) => (
        <View>
          {!!answer.title && (
            <Text style={tw.style('font-medium mb-2')}>{t(answer.title)}</Text>
          )}
          <View
            style={tw`flex ${answer.flexStyle === 'row' ? 'gap-3 flex-row' : ''} `}>
            {options.map(option => (
              <RadioButton
                color="red"
                key={option.code}
                label={option.name ?? ''}
                selected={
                  value !== undefined
                    ? value === option.code
                    : answer.value === option.code
                }
                onPress={() => onChange(option.code)}
              />
            ))}
          </View>
        </View>
      )}
    />
  );
};

export default RadioButtonAnswer;
