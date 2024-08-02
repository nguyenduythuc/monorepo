import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button,
  Pressable,
} from 'react-native';
import {BaseButtonProps} from '@lfvn-customer/shared/types/components/button';
import {
  buttonFilled,
  buttonHover,
  buttonOutlined,
  buttonSize,
  buttonText,
} from '@lfvn-customer/shared/themes/components/button';
import tw from 'twrnc';
import {Icon} from '../Icon';
import {useGetTheme} from '../../../hooks/useGetTheme';

export const CustomButton: FC<BaseButtonProps> = ({
  variant = 'filled',
  size = 'lg',
  color = 'blue',
  prefixIcon,
  iconColor,
  disabled,
  onPress,
  children,
  loading = false,
  styleTextLeft,
  ...props
}) => {
  const {theme} = useGetTheme();
  const {borderNegative100, borderUseful500, textUseful500} = theme;

  const defaultStyle =
    variant === 'outlined'
      ? buttonOutlined(color)
      : variant === 'text' || variant === 'link'
      ? buttonText(color)
      : buttonFilled(color);
  const textStyle =
    variant === 'link' ? buttonSize[size] + ' underline' : buttonSize[size];

  const [buttonState, setButtonState] = useState(false);

  const defaultStyleText =
    variant === 'filled'
      ? 'text-white font-semibold'
      : `font-semibold text-${color}-600`;

  const buttonType = useMemo(() => {
    if (buttonState) {
      return defaultStyle.replace(`-${color}-600`, `-${color}-700`);
    } else {
      return defaultStyle;
    }
  }, [buttonState]);

  const defaultText = useMemo(() => {
    if (buttonState) {
      return defaultStyleText.replace(`-${color}-600`, `-${color}-700`);
    } else {
      return defaultStyleText;
    }
  }, [buttonState]);

  const onHoverInFunc = () => {
    setButtonState(true);
  };
  const onHoverOutFunc = () => {
    setButtonState(false);
  };

  const PrefixIconComponent = useMemo(
    () => (prefixIcon ? <Icon name={prefixIcon} color={iconColor} /> : null),
    [prefixIcon, iconColor],
  );

  return (
    <View>
      <Pressable
        style={tw`${buttonType} items-center  flex flex-row rounded-lg ${
          disabled ? 'opacity-50' : ''
        } ${styleTextLeft ? 'justify-start' : 'justify-center'}`}
        disabled={disabled}
        onPress={onPress}
        onHoverIn={onHoverInFunc}
        onHoverOut={onHoverOutFunc}>
        {loading && (
          <ActivityIndicator animating={true} size="small" color="#0000ff" />
        )}
        {PrefixIconComponent}
        <Text style={tw`${textStyle} ${defaultText}`}>{children}</Text>
      </Pressable>
    </View>
  );
};
