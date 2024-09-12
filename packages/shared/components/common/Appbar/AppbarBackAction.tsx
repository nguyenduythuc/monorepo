import React from 'react';
import {View, Text, TouchableOpacity, TextStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon, IconKeys} from '../Icon';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';

export type AppbarBackActionProp = {
  handleGoBack?: () => void;
  icon?: IconKeys;
  title?: string;
  titleStyle?: TextStyle;
  backIconColor?: string;
  containerStyle?: string;
};

export const AppbarBackAction = ({
  icon = 'arrow-left',
  title,
  titleStyle,
  backIconColor = '#333333',
  containerStyle = '',
  handleGoBack,
}: AppbarBackActionProp) => {
  const {goBack} = useConfigRouting();
  const onPressBack = () => {
    if (handleGoBack) {
      handleGoBack();
    } else {
      goBack();
    }
  };
  return (
    <View style={tw`items-start ${containerStyle}`}>
      <TouchableOpacity onPress={onPressBack} style={tw`flex-row items-center`}>
        {icon && <Icon name={icon} color={backIconColor} disabled></Icon>}
        <Text style={[tw`text-base`, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
