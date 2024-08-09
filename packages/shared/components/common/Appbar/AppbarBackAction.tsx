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

export type AppbarBackActionProp = {
  onPress?: () => void;
  icon?: IconKeys;
  title?: string;
  titleStyle?: TextStyle;
  backIconColor?: string;
};

export const AppbarBackAction = ({
  onPress,
  icon = 'arrow-left',
  title,
  titleStyle,
  backIconColor = '#333333',
  ...rest
}: AppbarBackActionProp) => {
  return (
    <View style={tw`flex-1 items-start`}>
      <TouchableOpacity onPress={onPress} style={tw`flex-row items-center`}>
        {icon && (
          <Icon name={icon} width={15} color={backIconColor} disabled></Icon>
        )}
        <Text style={[tw`text-base`, titleStyle]}>{title}</Text>
        {/* <Text style={tw`text-black text-lg`}>Menu</Text> */}
      </TouchableOpacity>
    </View>
  );
};
