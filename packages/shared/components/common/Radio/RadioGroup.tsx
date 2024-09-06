import React, { useState } from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Radio } from './Radio';

export type RadioGroupProps = {
  onSelect: (selectOption: string) => void;
  color?: string;
  listStyle?: 'row' | 'col';
  options: { label: string; value: string }[];
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onSelect,
  color = 'blue',
  listStyle = 'row',
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={tw`flex flex-${listStyle}`}>
      {options.map(option => (
        <Radio
          color={color}
          key={option.value}
          label={option.label}
          selected={selectedOption === option.value}
          onPress={() => handleSelect(option.value)}
        />
      ))}
    </View>
  );
};
