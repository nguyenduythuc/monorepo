import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {SliderWithTextInput} from '../common';

const SliderAnswer = ({
  answer,
  control,
}: {
  answer: AnswerProps;
  control: Control;
}) => {
  return (
    <Controller
      key={answer.name}
      control={control}
      name={answer.name}
      render={({field: {onChange, value}}) => (
        <SliderWithTextInput
          color="red"
          onChangeText={onChange}
          onChangeSlider={onChange}
          value={value}
          maxValue={answer.maxValue ?? 10}
          minValue={answer.minValue ?? 1}
          step={answer.step ?? 1}
          unit={answer.unit ?? 'unit'}
          label={answer.title}
          defaultValue={answer.defaultValue ?? ''}
        />
      )}
    />
  );
};

export default SliderAnswer;
