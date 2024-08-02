import React, {forwardRef, useMemo} from 'react';
import {ITextInputProps} from '../../../types';
import {View, Text, TextInput as NativeTextInput} from 'react-native';
import tw from '../../../themes/tailwind';
// import Icon from 'react-native-vector-icons/AntDesign';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';

export const TextInputWithUnit = forwardRef<NativeTextInput, ITextInputProps>(
  ({value, containerStyle, onChangeValue, unit, ...props}, ref) => {
    const onPressClearText = () => {
      onChangeValue('');
    };

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
