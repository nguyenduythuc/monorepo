import React from 'react';
import {
  AnswerProps,
  AnswerType,
} from '@lfvn-customer/shared/types/models/stepModel';
import InputAnswer from './InputAnswer';
import DropdownAnswer from './DropdownAnswer';
import SliderAnswer from './SliderAnswer';
import CheckboxAnswer from './CheckboxAnswer';
import RadioButtonAnswer from './RadioButtonAnswer';
import {Control} from 'react-hook-form';
import CalendarDatePickerAnswer from './CalanderDatePickerAnswer';
import AddressInputModalAnswer from './AddressInputModalAnswer';

const Answer = ({answer, control}: {answer: AnswerProps; control: Control}) => {
  switch (answer.type) {
    case AnswerType.Input:
      return <InputAnswer answer={answer} control={control} />;
    case AnswerType.DropdownOption:
      return <DropdownAnswer answer={answer} control={control} />;
    case AnswerType.Slider:
      return <SliderAnswer answer={answer} control={control} />;
    case AnswerType.Checkbox:
      return <CheckboxAnswer answer={answer} control={control} />;
    case AnswerType.RadioButton:
      return <RadioButtonAnswer answer={answer} control={control} />;
    case AnswerType.CalenderDatePicker:
      return <CalendarDatePickerAnswer answer={answer} control={control} />;
    case AnswerType.AddressInputModal:
      return <AddressInputModalAnswer answer={answer} control={control} />;
    default:
      return null;
  }
};

export default Answer;
