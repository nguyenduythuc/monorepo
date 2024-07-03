import React, {FC, useMemo} from 'react';
import {ButtonProps, TouchableOpacity, View, Image} from 'react-native';
import {BaseButtonProps} from '../../../types/components/button';
import tw from 'twrnc';
import {roundButtonSize} from '../../../themes/components/button';
import {Icon} from '../Icon';

export const RoundButton: FC<BaseButtonProps> = ({
  color = 'amber',
  size = 'lg',
  prefixIcon,
  iconColor,
  disabled,
  onPress,
}) => {
  const buttonSize =
    roundButtonSize[size] +
    (disabled ? ` bg-gray-500 opacity-50` : ` bg-${color}-600`);
  const iconSize = {width: '25', height: '29'};

  const PrefixIconComponent = useMemo(
    () => (prefixIcon ? <Icon name={prefixIcon} color={iconColor} /> : null),
    [prefixIcon, iconColor],
  );

  return (
    <TouchableOpacity
      disabled={disabled}
      style={tw`${buttonSize}`}
      onPress={onPress}>
      {PrefixIconComponent}
    </TouchableOpacity>
  );
};
