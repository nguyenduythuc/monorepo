import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {TextInputDatePicker} from '../common';
import {View} from 'react-native';

const CalendarDatePickerAnswer = ({
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
      render={({field: {onChange, onBlur, value, ref}}) => (
        <TextInputDatePicker
          label={answer.title}
          keyboardType={answer.keyboardType}
          value={value}
          ref={ref}
          onBlur={onBlur}
          onChangeValue={onChange}
        />
      )}
    />
  );
};

export default CalendarDatePickerAnswer;
