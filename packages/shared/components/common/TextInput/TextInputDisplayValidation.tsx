import React, {forwardRef, useMemo, useState} from 'react';
import {ITextInputDisplayValidationProps} from '@lfvn-customer/shared/types';
import {View, TextInput as NativeTextInput} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {LabelValidation} from '../Label/LabelValidation';

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
        <LabelValidation
          validations={validations}
          value={value}
          colors={colors}
        />
      </View>
    );
  },
);
