import React from 'react';
import {AnswerProps} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, Controller} from 'react-hook-form';
import {Checkbox, Icon} from '../common';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

const CheckboxAnswer = ({
  answer,
  control,
}: {
  answer: AnswerProps;
  control: Control;
}) => {
  const t = useTranslations();
  return (
    <Controller
      key={answer.name}
      control={control}
      name={answer.name}
      render={({field: {onChange, value}}) => (
        <View style={tw`flex flex-row justify-between items-start mt-6`}>
          <Checkbox
            label={t(answer.title) ?? ''}
            description={t(answer.description)}
            isChecked={value}
            onChange={onChange}
            color={answer.checkboxColor}
          />
          <Icon
            size={20}
            color={answer.iconCheckboxColor ?? '#999999'}
            name={answer.iconCheckboxName ?? 'info-icon'}
          />
        </View>
      )}
    />
  );
};

export default CheckboxAnswer;
