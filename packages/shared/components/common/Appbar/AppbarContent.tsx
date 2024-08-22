import React from 'react';
import {View, Text, TextStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export type AppbarContentProp = {
  title?: string;
  children?: React.ReactNode;
  titleStyle?: TextStyle;
};

export const AppbarContent = ({
  title,
  children,
  titleStyle,
}: AppbarContentProp) => {
  return (
    <View
      style={tw`inset-x-20 flex justify-center absolute self-center items-center`}>
      <Text style={[tw`font-semibold text-xl`, titleStyle]}>{title}</Text>
      {children}
    </View>
  );
};
