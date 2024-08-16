import React, {forwardRef, useMemo, useState} from 'react';
import {ITextInputProps} from '@lfvn-customer/shared/types';
import {View, TextInput as NativeTextInput} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';

export const TextInput = forwardRef<NativeTextInput, ITextInputProps>(
  (
    {
      value,
      containerStyle,
      onChangeValue,
      secureTextEntry,
      watch,
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
          watch={watch}
          ref={ref}
          value={value}
          onChangeText={onChangeValue}
          rightComponent={ClearTextIconComponent}
          secureTextEntry={isHideSecureText}
        />
      </View>
    );
  },
);
