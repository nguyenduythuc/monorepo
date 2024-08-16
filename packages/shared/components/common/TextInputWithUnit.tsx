import React, {forwardRef, useMemo} from 'react';
import {ITextInputProps} from '@lfvn-customer/shared/types';
import {View, Text, TextInput as NativeTextInput} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputBase} from './TextInput/TextInputBase';

export const TextInputWithUnit = forwardRef<NativeTextInput, ITextInputProps>(
  ({value, containerStyle, onChangeValue, unit, ...props}, ref) => {
    const UnitComponent = useMemo(
      () => <Text style={tw`text-gray-500`}>{unit}</Text>,
      [],
    );

    return (
      <View style={tw.style(containerStyle)}>
        <TextInputBase
          {...props}
          ref={ref}
          value={value}
          onChangeText={onChangeValue}
          rightComponent={UnitComponent}
        />
      </View>
    );
  },
);
