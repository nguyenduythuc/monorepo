import React, {FC, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {BaseButtonProps} from '@lfvn-customer/shared/types/components/button';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {roundButtonSize} from '@lfvn-customer/shared/themes/components/button';
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
