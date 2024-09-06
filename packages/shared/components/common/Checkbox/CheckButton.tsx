import React, { FC, useMemo, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Icon, IconKeys } from '../Icon';

export type CheckButtonProps = {
  disabled?: boolean;
  label: string;
  onChange?: (selected: boolean, label: string) => void;
  prefixIcon?: IconKeys;
  color?: string;
  isChecked?: boolean;
  checkboxRight?: boolean;
  value?: string;
  iconColor?: string;
  size?: 'sm' | 'lg' | 'xl';
};

export const CheckButton: FC<CheckButtonProps> = ({
  disabled,
  label,
  onChange,
  color = 'blue',
  isChecked = false,
  prefixIcon,
  iconColor = '#999999',
  size = 'sm',
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handlePress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(checked, label);
    }
    console.log(newChecked);
  };

  // const checkboxSz = {
  //   sm: 'w-6 h-6',
  //   lg: 'w-7 h-7',
  //   xl: 'w-8 h-8',
  // };

  let defaultStyle =
    'border-2 border-gray-200 bg-white items-center justify-center rounded px-2 py-1';

  const defaultText = `text-${size} font-semibold text-gray-400`;

  const colorBorder = useMemo(() => {
    if (checked) {
      return defaultStyle.replace(
        `-gray-200 bg-white`,
        `-${color}-600 bg-${color}-50`,
      );
    } else {
      return defaultStyle;
    }
  }, [checked]);

  const colorText = useMemo(() => {
    if (checked) {
      return defaultText.replace(`-gray-400`, `-${color}-600`);
    } else {
      return defaultText;
    }
  }, [checked]);

  const colorIcon = useMemo(() => {
    if (checked) {
      return color;
    } else {
      return iconColor;
    }
  }, [checked]);

  const PrefixIconComponent = useMemo(
    () => (prefixIcon ? <Icon name={prefixIcon} color={colorIcon} /> : null),
    [prefixIcon, colorIcon],
  );

  return (
    <TouchableOpacity
      style={[
        tw`${colorBorder} items-center flex flex-row justify-center`,
        disabled && tw`opacity-50`,
      ]}
      disabled={disabled}
      onPress={handlePress}>
      {PrefixIconComponent && (
        <View style={tw`pr-1`}>{PrefixIconComponent}</View>
      )}

      {label && <Text style={tw`${colorText}`}>{label}</Text>}
    </TouchableOpacity>
  );
};
