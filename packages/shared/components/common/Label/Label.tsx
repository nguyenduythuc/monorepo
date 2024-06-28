import React from 'react';
import {ILabelProps} from '../../../types';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

export const Label: React.FC<ILabelProps> = ({
  title,
  required,
  labelStyle = '',
  containerStyle = '',
}) => {
  if (!title) return null;
  return (
    <View style={tw.style(['flex-row mb-2', containerStyle])}>
      <Text style={tw.style(['text-base text-slate-950'], labelStyle)}>
        {title}
      </Text>
      {required && <Text style={tw`text-base text-red-700`}>{' *'}</Text>}
    </View>
  );
};
