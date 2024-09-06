import React, { FC, useEffect, useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export type SwitchProps = {
  disabled?: boolean;
  onChange?: (newValue: boolean) => void;
  color?: string;
  value?: boolean;
  size?: 'sm' | 'lg';
};

export const SwitchCustom: FC<SwitchProps> = ({
  disabled,
  onChange,
  color = 'blue',
  value = false,
  size = 'sm',
}) => {
  const [checked, setChecked] = useState(value);
  const [translateX] = useState(new Animated.Value(0));

  const switchSz = {
    outerSz: { sm: 'w-16 h-8', lg: 'w-20 h-10' },
    innerSz: { sm: 'w-6 h-6', lg: 'w-8 h-8' },
    changeSz: { sm: 32, lg: 40 },
  };

  const handlePress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
    console.log(newChecked);
  };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: checked ? switchSz.changeSz[size] : 0, // Adjust the value based on the switch's width
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  return (
    <View style={tw`flex flex-row items-center`}>
      <Pressable
        disabled={disabled}
        onPress={handlePress}
        style={[
          checked ? tw`bg-${color}-500` : tw`bg-gray-300`,
          tw`rounded-full p-1 ${switchSz.outerSz[size]}`,
        ]}>
        <View style={[tw`flex rounded-full relative justify-center`]}>
          <Animated.View
            style={[
              tw`bg-white rounded-full ${switchSz.innerSz[size]} top-0 absolute`,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};
