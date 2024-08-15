import React, {FC, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon, IconKeys} from '@lfvn-customer/shared/components/common/Icon';
import {useGetTheme} from '../../../hooks/useGetTheme';

export type ProductCardProp = {
  iconName: IconKeys;
  title?: string;
  description?: string;
  description2?: string;
  onPress?: () => void;
};

export const ProductCard = ({
  iconName,
  title,
  description,
  description2,
  onPress,
}: ProductCardProp) => {
  const {theme, colors} = useGetTheme();

  const {textNegative500, textUseful500, textNegative300} = theme;

  return (
    <View style={tw.style('shadow-slate-300')}>
      <TouchableOpacity
        onPress={onPress}
        style={tw.style(
          'border border-gray-300 bg-white shadow-md shadow-slate-500 rounded-xl p-3 mb-4',
        )}>
        <View style={tw.style('flex flex-row items-center mr-2.5')}>
          <Icon name={iconName} disabled />
          <View style={tw.style('flex-col flex-1 ml-3')}>
            <Text style={tw.style(`${textNegative500} font-semibold mb-1`)}>
              {title}
            </Text>
            <Text style={tw.style(`text-gray-400 ${textNegative500}`)}>
              {description}
            </Text>
            <Text style={tw.style(`text-gray-400 ${textNegative500}`)}>
              {description2}
            </Text>
          </View>
          <Icon name="arrow-right" color="gray" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
