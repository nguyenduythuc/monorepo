import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {TextInputWithUnit} from '../common/TextInput/TextInputWithUnit';

const InputAnswer = ({
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
        <TextInputWithUnit
          keyboardType={answer.keyboardType}
          onChangeValue={onChange}
          value={value}
          onBlur={onBlur}
          disabled={answer.disabled}
          label={answer.title}
          ref={ref}
          unit={answer.unit}
          // errorMessage={
          //   errors[field.controlProps.name]?.message?.toString() || ''
          // }
          // required={!!field.controlProps.rules?.required}
          placeholder={answer.placeholder}
          // validations={field.validations}
        />
      )}
    />
  );
};

export default InputAnswer;
