import React, {useMemo} from 'react';
import {ITextInputProps, IconName} from '../../../types';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';
// import Icon from 'react-native-vector-icons/AntDesign';

export const TextInputSearch: React.FC<ITextInputProps> = ({
  value,
  containerStyle,
  onPressLeftComponent,
  onPressRightComponent,
  ...props
}) => {
  const ClearTextIconComponent = useMemo(
    () => (value ? <Icon name={IconName.closecircle} size={24} /> : null),
    [value, onPressRightComponent],
  );

  const SearchIconComponent = useMemo(
    () => <Icon name={IconName.search} size={24} />,
    [value, onPressRightComponent],
  );

  return (
    <View style={tw.style(containerStyle)}>
      <TextInputBase
        {...props}
        value={value}
        rightComponent={ClearTextIconComponent}
        leftComponent={SearchIconComponent}
      />
    </View>
  );
};
