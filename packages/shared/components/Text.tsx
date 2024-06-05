import React from 'react'
import { Text } from 'react-native';

// Example function
export const add = (a: number, b: number) => {
	return a + b;
}

interface ButtonProps {
	text: string;
}

export const Label: React.FC<ButtonProps> = ({ text }) => {
  return <Text style={{color: 'red'}}>{text}</Text>;
};
