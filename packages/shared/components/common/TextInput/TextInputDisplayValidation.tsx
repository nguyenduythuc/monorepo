import React, {forwardRef, useMemo, useState} from 'react';
import {
  ITextInputDisplayValidationProps,
  InputValidationKeys,
} from '@lfvn-customer/shared/types';
import {View, TextInput as NativeTextInput, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {
  validateStringIncludeUpperCaseAndLowerCase,
  validateStringInlcudeNumberAndSpecialCharacter,
  validateStringLengthFrom8To15Characters,
} from '../../../hooks';

export const TextInputDisplayValidation = forwardRef<
  NativeTextInput,
  ITextInputDisplayValidationProps
>(
  (
    {
      value,
      containerStyle,
      onChangeValue,
      secureTextEntry,
      validations = [],
      touched,
      ...props
    },
    ref,
  ) => {
    const [isHideSecureText, setIsHideSecureText] = useState(secureTextEntry);

    const onPressShowHideSecureText = () => {
      setIsHideSecureText(prev => !prev);
    };

    const onPressClearText = () => {
      onChangeValue('');
    };
    const {colors} = useGetTheme();
    const t = useTranslations();

    const ClearTextIconComponent = useMemo(
      () => (
        <View style={tw.style('flex-row items-center justify-center')}>
          {secureTextEntry && (
            <Icon
              name={isHideSecureText ? 'eye-open' : 'eye-close'}
              onPress={onPressShowHideSecureText}
            />
          )}
          {value && <Icon name="close-circle" onPress={onPressClearText} />}
        </View>
      ),
      [value, isHideSecureText],
    );

    const renderValidationItem = useMemo(
      () =>
        ({
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
        },
      [],
    );

    const renderValidationLabels = useMemo(() => {
      let tickColor = '';
      let textColor = '';
      return () => (
        <View style={tw.style('my-2')}>
          {validations.map((validation, index) => {
            switch (validation) {
              case InputValidationKeys.STRING_LENGTH_FROM_8_TO_15_CHARACTERS:
                tickColor = !value
                  ? colors['negative-300']
                  : validateStringLengthFrom8To15Characters(value)
                  ? colors['useful-500']
                  : colors['negative-300'];
                textColor = !value
                  ? colors['negative-300']
                  : validateStringLengthFrom8To15Characters(value)
                  ? colors['negative-500']
                  : colors['danger-500'];
                return renderValidationItem({
                  title: t('ResetPassword.msgLengthPassFrom8To15Characters'),
                  textColor,
                  iconColor: tickColor,
                  index,
                });
              case InputValidationKeys.STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE:
                tickColor = !value
                  ? colors['negative-300']
                  : validateStringIncludeUpperCaseAndLowerCase(value)
                  ? colors['useful-500']
                  : colors['negative-300'];
                textColor = !value
                  ? colors['negative-300']
                  : validateStringIncludeUpperCaseAndLowerCase(value)
                  ? colors['negative-500']
                  : colors['danger-500'];
                return renderValidationItem({
                  title: t(
                    'ResetPassword.msgPasswordNotIncludeUpperCaseAndLowerCase',
                  ),
                  textColor,
                  iconColor: tickColor,
                  index,
                });
              case InputValidationKeys.STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER:
                tickColor = !value
                  ? colors['negative-300']
                  : validateStringInlcudeNumberAndSpecialCharacter(value)
                  ? colors['useful-500']
                  : colors['negative-300'];
                textColor = !value
                  ? colors['negative-300']
                  : validateStringInlcudeNumberAndSpecialCharacter(value)
                  ? colors['negative-500']
                  : colors['danger-500'];
                return renderValidationItem({
                  title: t(
                    'ResetPassword.msgPasswordNotIncludeNumberAndSpecialCharacter',
                  ),
                  textColor,
                  iconColor: tickColor,
                  index,
                });
              default:
                return null;
            }
          })}
        </View>
      );
    }, [validations, value, colors, t, renderValidationItem]);

    return (
      <View style={tw.style(containerStyle)}>
        <TextInputBase
          {...props}
          ref={ref}
          value={value}
          onChangeText={onChangeValue}
          rightComponent={ClearTextIconComponent}
          secureTextEntry={isHideSecureText}
        />
        {renderValidationLabels()}
      </View>
    );
  },
);
