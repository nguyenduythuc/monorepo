import React, { useState } from 'react';
import { View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import tw from '@lfvn-customer/shared/themes/tailwind';

export interface BaseSliderProps {
  maxValue?: number;
  minValue?: number;
  defaultValue?: number;
  step?: number;
  sliderValue: number;
  onChangeSlider: (value: number) => void;
  style?: string;
  disabled?: boolean;
  color?: string;
}

export const BaseSlider = ({
  maxValue = 1,
  minValue = 0,
  defaultValue = minValue,
  step,
  sliderValue,
  disabled,
  color = 'red',
  onChangeSlider,
  ...props
}: BaseSliderProps) => {
  return (
    <View
      style={[
        tw`flex-1 items-stretch justify-center`,
        disabled && tw`opacity-50`,
      ]}>
      <Slider
        disabled={disabled}
        minimumTrackStyle={tw`bg-${color}-500 h-1 rounded-l-xl`}
        maximumTrackStyle={tw`bg-${color}-200 h-1`}
        step={step}
        // minimumTrackTintColor="#E7252B"
        // maximumTrackTintColor="#FFDAD6"
        maximumValue={maxValue}
        minimumValue={minValue}
        thumbStyle={tw`bg-white border-2 border-${color}-500`}
        value={sliderValue}
        onValueChange={value => onChangeSlider(value[0])}
      />
      {/* <View style={tw`flex flex-row justify-between`}>
        <Text>{minValue} VND</Text>
        <Text>{sliderValue}</Text>
        <Text>{maxValue} VND</Text>
      </View> */}
    </View>
  );
};
