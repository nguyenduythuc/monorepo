import React from 'react';
import {ITextInputProps} from '../../../types';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

export const TextInputBase: React.FC<ITextInputProps> = ({
  touched,
  error,
  rightComponent,
  leftComponent,
  disabled,
  value,
  ...props
}) => {
  return (
    <View>
      <Text style={tw`text-xl text-yellow-900`}>Current themes: 2222</Text>
      <TouchableOpacity style={tw`bg-amber-500 h-40`} onPress={() => null}>
        <Text style={tw`text-xl text-red-900`}>Toggle 2222</Text>
      </TouchableOpacity>
    </View>
  );
};
