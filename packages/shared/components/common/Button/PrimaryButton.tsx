import {View} from 'react-native';
import {CustomButton} from '../Button/BaseButton';
import React from 'react';
import tw from 'twrnc';

export const PrimaryButton = ({title = '', onPress = () => {}}) => {
  return (
    <View style={tw`absolute bottom-0 px-4 w-full`}>
      <CustomButton onPress={onPress}>{title}</CustomButton>
    </View>
  );
};
