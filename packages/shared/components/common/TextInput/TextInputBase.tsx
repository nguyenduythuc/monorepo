import React, {forwardRef, useState} from 'react';
import {ITextInputBaseProps} from '@lfvn-customer/shared/types';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Label} from '@lfvn-customer/shared/components/common/Label';
import {TextError} from '../TextError';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

export const TextInputBase = forwardRef<TextInput, ITextInputBaseProps>(
  (
    {
      touched,
      errorMessage,
      isFocus,
      rightComponent,
      leftComponent,
      disabled,
      containerStyle,
      containerInputStyle = '',
      label,
      required,
      secureTextEntry,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [focus, setFocus] = useState(isFocus);
    const {theme} = useGetTheme();
    const {borderNegative100, borderUseful500, textNegative500} = theme;

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(true);
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(false);
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <View style={tw.style(containerStyle)}>
        <Label title={label} required={required} />
        <View
          style={tw.style([
            `flex-row border rounded-10px px-4 items-center bg-white`,
            disabled
              ? 'border-neutral-400 bg-neutral-200 border-0'
              : !!errorMessage
              ? 'border-red-600'
              : focus
              ? borderUseful500
              : borderNegative100,
            containerInputStyle,
          ])}>
          {leftComponent && leftComponent}
          <TextInput
            {...props}
            ref={ref}
            editable={!disabled}
            style={tw.style([`flex-1 h-10, border-0 ${textNegative500}`])}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry}
          />
          {rightComponent && rightComponent}
        </View>
        <TextError title={errorMessage} />
      </View>
    );
  },
);
