import React, {forwardRef, useMemo} from 'react';
import {ITextInputProps} from '@lfvn-customer/shared/types';
import {View, TextInput as NativeTextInput} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';

export const TextInputSearch = forwardRef<NativeTextInput, ITextInputProps>(
  ({value, containerStyle, onChangeValue, ...props}, ref) => {
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

    const SearchIconComponent = useMemo(
      () => <Icon name="search" size={24} />,
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
          leftComponent={SearchIconComponent}
        />
      </View>
    );
  },
);
