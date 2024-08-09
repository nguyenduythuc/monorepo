import React, {useMemo} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import tw from 'twrnc';

export type AppbarContentProp = {
  title?: string;
  children?: React.ReactNode;
  titleStyle?: TextStyle;
};

export const AppbarContent = ({
  title,
  children,
  titleStyle,
  ...rest
}: AppbarContentProp) => {
  return (
    <View
      style={tw`inset-x-20 flex justify-center absolute self-center items-center`}>
      <Text style={[tw`font-semibold text-xl`, titleStyle]}>{title}</Text>
      {children}
    </View>
  );
};
