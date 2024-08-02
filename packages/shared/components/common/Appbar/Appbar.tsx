import React, {useMemo} from 'react';

import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

export type AppbarProp = {children?: React.ReactNode};

export const Appbar = ({children}: AppbarProp) => {
  return (
    <View
      style={tw`relative flex-row w-full h-11 items-center px-4 py-2 bg-white`}>
      {children}
    </View>
  );
};
