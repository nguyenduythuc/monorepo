import {View, Text, TouchableOpacity, ScrollView, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon} from '../Icon';
import {
  ekycDataType,
  mapEkycKeyValue,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';

import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

type InfoDataCardProps = {
  cardRawData: ekycDataType;
};

export const InfoDataCard: React.FC<InfoDataCardProps> = ({cardRawData}) => {
  const t = useTranslations();

  const renamedData = Object.keys(cardRawData).reduce(
    (acc, key) => {
      const ekycKey = key as keyof ekycDataType;
      const newKey = mapEkycKeyValue[ekycKey];
      acc[newKey] = cardRawData[ekycKey];
      return acc;
    },
    {} as {[key: string]: string | undefined},
  );

  return (
    <View
      style={tw.style(
        'border border-dashed border-[#E5E5E5] px-4 rounded-lg py-1 my-3',
      )}>
      {Object.entries(renamedData).map(([key, value], index) => (
        <View
          key={key}
          style={tw.style([
            'flex-row flex-1 border-[#E5E5E5] py-2.5 ',
            index !== Object.keys(renamedData).length - 1 ? 'border-b' : '',
          ])}>
          <View style={tw.style('w-1/2')}>
            <Text style={tw.style('text-[#999999] text-base')}>
              {t(`${key}`)}:
            </Text>
          </View>

          <View style={tw.style('w-1/2 flex justify-end items-end')}>
            <Text style={tw.style('font-semibold text-base text-right')}>
              {value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
