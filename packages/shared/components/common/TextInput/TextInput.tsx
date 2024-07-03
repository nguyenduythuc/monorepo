import React, {forwardRef, useMemo} from 'react';
import {ITextInputProps} from '../../../types';
import {View, TextInput as NativeTextInput} from 'react-native';
import tw from 'twrnc';
// import Icon from 'react-native-vector-icons/AntDesign';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';

export const TextInput = forwardRef<NativeTextInput, ITextInputProps>(
  (
    {
      value,
      containerStyle,
      onPressLeftComponent,
      onPressRightComponent,
      ...props
    },
    ref,
  ) => {
    const ClearTextIconComponent = useMemo(
      () => (value ? <Icon name="close-circle" size={24} /> : null),
      [value, onPressRightComponent],
    );

    return (
      <View style={tw.style(containerStyle)}>
        <TextInputBase
          {...props}
          ref={ref}
          value={value}
          rightComponent={ClearTextIconComponent}
        />
      </View>
    );
  },
);
