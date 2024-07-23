import React, {forwardRef, useMemo} from 'react';
import {ITextInputProps} from '@lfvn-customer/shared/types';
import {View, TextInput as NativeTextInput} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
// import Icon from 'react-native-vector-icons/AntDesign';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';

export const TextInput = forwardRef<NativeTextInput, ITextInputProps>(
  ({value, containerStyle, onChangeValue, secureTextEntry, ...props}, ref) => {
    const onPressClearText = () => {
      onChangeValue('');
    };

    const ClearTextIconComponent = useMemo(
      () =>
        value ? (
          <Icon name="close-circle" size={24} onPress={onPressClearText} />
        ) : null,
      [value],
    );

    return (
      <View style={tw.style(containerStyle)}>
        <TextInputBase
          {...props}
          ref={ref}
          value={value}
          onChangeText={onChangeValue}
          rightComponent={ClearTextIconComponent}
        />
      </View>
    );
  },
);
