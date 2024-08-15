import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {
  TextInput,
  BaseSlider,
  TextInputWithUnit,
} from '@lfvn-customer/shared/components';

export interface SliderWithTextInputProps {
  label?: string;
  max_value: number;
  min_value: number;
  unit: string;
  step: number;
  color?: string;
  onChangeSlider: (value: number) => void;
  value: number;
  defaultValue: string;
  onChange: (value: any) => void;
}

export const SliderWithTextInput = ({
  label,
  max_value,
  min_value,
  unit,
  step,
  color = 'blue',
  onChangeSlider,
  value,
  defaultValue,
  onChange,
  ...props
}: SliderWithTextInputProps) => {
  const formatterVND = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const formatValue = (value: number) => {
    if (unit === 'VND') {
      return formatterVND.format(value).replace(/^\D+/g, '');
    } else {
      return value.toString();
    }
  };

  return (
    <View style={tw`mt-6`}>
      <TextInputWithUnit
        onChangeValue={onChange}
        label={label}
        value={formatValue(value)}
        unit={unit}
      />

      <BaseSlider
        maxValue={max_value}
        minValue={min_value}
        step={step}
        sliderValue={value}
        onChangeSlider={onChangeSlider}
        color={color}
        defaultValue={parseFloat(defaultValue)}
      />
      <View style={tw`flex flex-row justify-between`}>
        <Text style={tw`text-gray-500`}>
          {formatValue(min_value)} {unit}
        </Text>
        <Text style={tw`text-gray-500`}>
          {formatValue(max_value)} {unit}
        </Text>
      </View>
    </View>
  );
};
