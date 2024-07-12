import React from 'react';
import {Text, Pressable} from 'react-native';
import tw from 'twrnc';

export type DataTableCellProps = {
  style?: string;
  numberOfLines?: number;
  width?: number;
  textStyle?: string;
  children: React.ReactNode;
  onPress?: () => void;
};

export const DataTableCell = ({
  style = '',
  numberOfLines = 2,
  textStyle = '',
  width,
  children,
  onPress,
  ...rest
}: DataTableCellProps) => {
  const cellWidth = width ? `w-[${width}px]` : `w-auto`;

  return (
    <Pressable
      style={tw`${cellWidth} min-h-${
        numberOfLines * 6
      } py-1.5 pr-2 pl-3 items-start ${style}`}
      onPress={onPress}>
      {typeof children === 'string' ? (
        <Text numberOfLines={numberOfLines} style={tw`${textStyle}`}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};
