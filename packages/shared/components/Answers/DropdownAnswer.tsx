import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {DropDownSelect} from '../common';

const DropdownAnswer = ({
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
        <DropDownSelect
          defaultValue={
            options && options.length > 0
              ? options[0].productCode || options[0].code
              : []
          }
          value={
            value ||
            (options && options.length > 0
              ? options[0].productCode || options[0].code
              : '')
          }
          label={answer.title}
          options={options}
          onChange={onChange}
        />
      )}
    />
  );
};

export default DropdownAnswer;
