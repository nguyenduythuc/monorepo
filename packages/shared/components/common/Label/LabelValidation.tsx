import React from 'react';
import {
  ILabelValidationProps,
  InputValidationKeys,
} from '@lfvn-customer/shared/types';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {useTranslations} from 'use-intl';
import {Icon} from '../Icon';
import useValidations from '../../../hooks/validations/useValidations';

export const LabelValidation: React.FC<ILabelValidationProps> = ({
  containerStyle = '',
  validations = [],
  value = '',
}) => {
  const {colors} = useGetTheme();
  const t = useTranslations();

  const {
    validateStringLengthFrom8To15Characters,
    validateStringIncludeUpperCaseAndLowerCase,
    validateStringInlcudeNumberAndSpecialCharacter,
  } = useValidations();

  const getValidationResult = (
    validation: InputValidationKeys,
    value: string,
    colors: {[key: string]: string},
  ) => {
    let validateFunction;
    let successColor = colors['useful-500'];
    let textSuccessColor = colors['negative-500'];
    let defaultColor = colors['negative-300'];
    let errorColor = colors['danger-500'];

    switch (validation) {
      case InputValidationKeys.STRING_LENGTH_FROM_8_TO_15_CHARACTERS:
        validateFunction = validateStringLengthFrom8To15Characters;
        break;
      case InputValidationKeys.STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE:
        validateFunction = validateStringIncludeUpperCaseAndLowerCase;
        break;
      case InputValidationKeys.STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER:
        validateFunction = validateStringInlcudeNumberAndSpecialCharacter;
        break;
      default:
        return null;
    }

    const isValid = value && validateFunction(value);
    const tickColor = isValid ? successColor : defaultColor;
    const textColor = !value
      ? defaultColor
      : isValid
        ? textSuccessColor
        : errorColor;

    return {tickColor, textColor};
  };

  const renderValidationItem = ({
    title,
    textColor,
    iconColor,
    index,
  }: {
    title: string;
    textColor: string;
    iconColor: string;
    index: number;
  }) => {
    return (
      <View key={index} style={tw.style('flex-row items-center my-2')}>
        <Icon name="check-circle" color={iconColor} />
        <Text style={tw.style(`text-base ml-2`, {color: textColor})}>
          {title}
        </Text>
      </View>
    );
  };

  const titleMap = {
    [InputValidationKeys.STRING_LENGTH_FROM_8_TO_15_CHARACTERS]: t(
      'ResetPassword.msgLengthPassFrom8To15Characters',
    ),
    [InputValidationKeys.STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE]: t(
      'ResetPassword.msgPasswordNotIncludeUpperCaseAndLowerCase',
    ),
    [InputValidationKeys.STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER]: t(
      'ResetPassword.msgPasswordNotIncludeNumberAndSpecialCharacter',
    ),
  };

  return (
    <View style={tw.style(['my-2', containerStyle])}>
      {validations.map((validation, index) => {
        const validationResult = getValidationResult(validation, value, colors);
        if (!validationResult) return null;

        const {tickColor, textColor} = validationResult;

        return renderValidationItem({
          title: titleMap[validation],
          textColor,
          iconColor: tickColor,
          index,
        });
      })}
    </View>
  );
};
