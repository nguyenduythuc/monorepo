import React, { FC, useMemo, useState } from 'react';
import { Text, View, ActivityIndicator, Pressable } from 'react-native';
import { BaseButtonProps } from '@lfvn-customer/shared/types/components/button';
import {
  buttonFilled,
  buttonOutlined,
  buttonSize,
  buttonText,
} from '@lfvn-customer/shared/themes/components/button';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Icon } from '../Icon';

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
  textCustomStyle = '',
  buttonStyle = '',
}) => {
  const getDefaultStyle = () => {
    if (variant === 'outlined') {
      return buttonOutlined(color);
    } else if (variant === 'text' || variant === 'link') {
      return buttonText(color);
    } else {
      return buttonFilled(color);
    }
  };

  const defaultStyle = getDefaultStyle();

  const textStyle =
    variant === 'link' ? buttonSize[size] + ' underline' : buttonSize[size];

  const [buttonState, setButtonState] = useState(false);

  const defaultStyleText =
    variant === 'filled'
      ? `text-white text-lg font-semibold ${textCustomStyle}`
      : `font-semibold text-base text-${color}-600 `;

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
        style={tw`${buttonType} items-center flex flex-row rounded-xl ${disabled ? 'opacity-50' : ''
          } ${styleTextLeft ? 'justify-start' : 'justify-center'} ${buttonStyle}`}
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
