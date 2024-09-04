import React from 'react';
import { IImageProps } from '@lfvn-customer/shared/types';
import { Image as ImageNative, Platform } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import ImageName from '@lfvn-customer/shared/assets/images';

export const Image: React.FC<IImageProps> = ({
  style,
  resizeMode = 'contain',
  iconName,
}) => {
  if (!iconName) {
    return null;
  }
  return (
    <>
      {Platform.OS !== 'web' ? (
        <ImageNative
          source={
            Platform.OS === 'android' ? { uri: iconName } : ImageName[iconName]
          }
          style={tw.style(style as string)}
          resizeMode={resizeMode}
        />
      ) : (
        <img src={`/images/${iconName}.png`} style={tw.style(style as string)} alt="Logo" />
      )}
    </>
  );
};
