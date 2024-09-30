import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {RadioButton} from '../common';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

const RadioButtonAnswer = ({
  answer,
  control,
}: {
  answer: AnswerProps;
  control: Control;
}) => {
  const options = answer?.options ?? [];
  return (
    <Controller
      key={answer.name}
      control={control}
      name={answer.name}
      render={({field: {onChange, value}}) => (
        <View style={tw`flex flex-col`}>
          {options.map(option => (
            <RadioButton
              color="red"
              key={option.code}
              label={option.name ?? ''}
              selected={value === option.code}
              onPress={() => onChange(option.code)}
            />
          ))}
        </View>
      )}
    />
  );
};

export default RadioButtonAnswer;
