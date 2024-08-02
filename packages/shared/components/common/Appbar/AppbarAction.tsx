import React, {useMemo} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import tw from 'twrnc';
import {Icon, IconKeys} from '../Icon';

export type AppbarActionProp = {
  onPress?: () => void;
  icon?: IconKeys;
  title?: string;
  titleStyle?: TextStyle;
};

export const AppbarAction = ({
  onPress,
  icon,
  title,
  titleStyle,
  ...rest
}: AppbarActionProp) => {
  return (
    <View style={tw`flex-1 justify-end items-end`}>
      <TouchableOpacity onPress={onPress} style={tw`flex-row items-center`}>
        {icon && <Icon name={icon} width={15} color="#333333" disabled></Icon>}
        <Text style={[tw`text-base`, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
