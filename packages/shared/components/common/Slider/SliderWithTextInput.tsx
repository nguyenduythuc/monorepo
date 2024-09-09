import React from 'react';
import { Text, View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { BaseSlider, TextInputWithUnit } from '@lfvn-customer/shared/components';

export interface SliderWithTextInputProps {
  label?: string;
  maxValue: number;
  minValue: number;
  unit: string;
  step: number;
  color?: string;
  onChangeSlider: (value: number) => void;
  value: number;
  defaultValue: string;
  onChangeText: (value: string) => void;
}

export const SliderWithTextInput = ({
  label,
  maxValue,
  minValue,
  unit,
  step,
  color = 'blue',
  onChangeSlider,
  value,
  defaultValue,
  onChangeText,
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
        onChangeValue={onChangeText}
        label={label}
        value={formatValue(value)}
        unit={unit}
        keyboardType={'number-pad'}
      />

      <View style={tw.style('h-10')}>
        <BaseSlider
          maxValue={maxValue}
          minValue={minValue}
          step={step}
          sliderValue={value}
          onChangeSlider={onChangeSlider}
          color={color}
          defaultValue={parseFloat(defaultValue)}
        />
      </View>
      <View style={tw`flex flex-row justify-between`}>
        <Text style={tw`text-gray-500`}>
          {formatValue(minValue)} {unit}
        </Text>
        <Text style={tw`text-gray-500`}>
          {formatValue(maxValue)} {unit}
        </Text>
      </View>
    </View>
  );
};
