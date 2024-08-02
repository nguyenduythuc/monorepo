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
    <View style={tw`absolute ml-4 w-full flex-1 z-10 items-center `}>
      <Text style={[tw`font-semibold text-xl`, titleStyle]}>{title}</Text>
      {children}
    </View>
  );
};
