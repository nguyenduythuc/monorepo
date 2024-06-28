import React from 'react';
import {Pressable, View} from 'react-native';
import SearchIcon from '../../../assets/images/svg/SearchIcon';
import CloseCircleIcon from '../../../assets/images/svg/CloseCircleIcon';
import {IconProps} from '../../../types';

export const Icon: React.FC<IconProps> = ({
  name,
  disabled,
  onPress,
  ...props
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'search':
        return <SearchIcon {...props} />;
      case 'closecircle':
        return <CloseCircleIcon {...props} />;

      default:
        return <View />;
    }
  };

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      {renderIcon()}
    </Pressable>
  );
};
