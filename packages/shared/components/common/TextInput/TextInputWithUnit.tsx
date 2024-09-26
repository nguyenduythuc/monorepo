import React, {forwardRef, useMemo} from 'react';
import {ITextInputProps} from '@lfvn-customer/shared/types';
import {View, TextInput as NativeTextInput, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

export const TextInputWithUnit = forwardRef<NativeTextInput, ITextInputProps>(
  ({value, containerStyle, onChangeValue, unit, ...props}, ref) => {
    const {theme} = useGetTheme();
    const {textNegative300} = theme;

    const onPressClearText = () => {
      onChangeValue('');
    };

    const ClearTextIconComponent = useMemo(
      () => (
        <View style={tw.style('flex-row')}>
          {value ? (
            <Icon name="close-circle" size={24} onPress={onPressClearText} />
          ) : null}
          {unit && (
            <Text style={tw.style(`text-base ${textNegative300} ml-1`)}>
              {unit}
            </Text>
          )}
        </View>
      ),
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
