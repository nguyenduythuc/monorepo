import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export type BaseCardProp = {
  cardStyle?: string;
  onPress?: () => void;
  children: React.ReactNode;
};

export const BaseCard = ({cardStyle = '', onPress, children}: BaseCardProp) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={tw.style([
          'border border-gray-300 bg-white shadow-md shadow-slate-400 rounded-xl p-3 mb-4',
          cardStyle,
        ])}>
        {children}
      </TouchableOpacity>
    </View>
  );
};
