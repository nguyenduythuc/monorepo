import React from 'react';
import {ITextInputBaseProps} from '../../../types';
import {View, TextInput} from 'react-native';
import tw from 'twrnc';
import {Label} from '../Label';
import {TextError} from '../TextError';

export const TextInputBase: React.FC<ITextInputBaseProps> = ({
  touched,
  error,
  focus,
  rightComponent,
  leftComponent,
  disabled,
  containerStyle,
  containerInputStyle = '',
  label,
  required,
  ...props
}) => {
  return (
    <View style={tw.style(containerStyle)}>
      <Label title={label} required={required} />
      <View
        style={tw.style([
          'flex-row border border-neutral-600 rounded-sm px-4 items-center bg-white',
          disabled
            ? 'border-neutral-400 bg-neutral-200 border-0'
            : error
            ? 'border-red-600'
            : focus
            ? 'border-amber-500'
            : 'border-neutral-600',
          containerInputStyle,
        ])}>
        {leftComponent && leftComponent}
        <TextInput
          {...props}
          editable={!disabled}
          style={tw.style(['flex-1 h-10'])}
        />
        {rightComponent && rightComponent}
      </View>
      <TextError title={error} />
    </View>
  );
};
