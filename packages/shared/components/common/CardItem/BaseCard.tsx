import React from 'react';
import {TouchableOpacity, Text, View, ViewStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

export type BaseCardProp = {
  cardStyle?: string;
  onPress?: () => void;
  children: React.ReactNode;
};

export const BaseCard = ({cardStyle = '', onPress, children}: BaseCardProp) => {
  const {theme, colors} = useGetTheme();

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
