import React from 'react';
import {IImageBackgroundProps} from '@lfvn-customer/shared/types';
import {ImageBackground as ImageBackgroundNative, Platform} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import ImageName from '@lfvn-customer/shared/assets/images';

export const ImageBackground: React.FC<IImageBackgroundProps> = ({
  style,
  iconName,
  children,
}) => {
  if (!iconName) {
    return null;
  }
  return (
    <ImageBackgroundNative
      source={Platform.OS === 'android' ? {uri: iconName} : ImageName[iconName]}
      style={tw.style('flex-1', style as string)}>
      {children}
    </ImageBackgroundNative>
  );
};
