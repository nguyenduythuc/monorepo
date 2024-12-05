import React from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export type DataTableTitleProps = {
  style?: string;
  numberOfLines?: number;
  width?: number;
  textStyle?: string;
  children: React.ReactNode;
};
export const DataTableTitle = ({
  style = '',
  numberOfLines = 2,
  width,
  textStyle = '',
  children,
}: DataTableTitleProps) => {
  const headerCellWidth = width ? `w-[${width}px]` : `w-auto`;

  return (
    <View
      style={[tw.style(`${headerCellWidth} py-1 px-3 border-gray-400`, style)]}>
      <Text
        numberOfLines={numberOfLines}
        style={tw`leading-6 max-h-[${
          24 * numberOfLines
        }px] font-bold text-left text-lg ${textStyle}`}>
        {children}
      </Text>
    </View>
  );
};
