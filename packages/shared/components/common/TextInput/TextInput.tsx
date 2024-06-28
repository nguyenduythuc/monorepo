import React, {useMemo} from 'react';
import {ITextInputProps, IconName} from '../../../types';
import {View} from 'react-native';
import tw from 'twrnc';
// import Icon from 'react-native-vector-icons/AntDesign';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';

export const TextInput: React.FC<ITextInputProps> = ({
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

  return (
    <View style={tw.style(containerStyle)}>
      <TextInputBase
        {...props}
        value={value}
        rightComponent={ClearTextIconComponent}
      />
    </View>
  );
};
