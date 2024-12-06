import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {AddressModal} from '../common/AddressModal';

const AddressInputModalAnswer = ({
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
        <AddressModal label={answer.title} value={value} onChange={onChange} />
      )}
    />
  );
};

export default AddressInputModalAnswer;
