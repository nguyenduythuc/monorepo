import React from 'react';
import {IImageProps} from '@lfvn-customer/shared/types';
import {Image as ImageNative, Platform} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export const Image: React.FC<IImageProps> = ({
  source,
  style,
  resizeMode = 'contain',
}) => {
  return (
    <>
      {Platform.OS !== 'web' ? (
        <ImageNative
          source={
            Platform.OS === 'android' ? {uri: source.android} : source.ios
          }
          style={tw.style(style as string)}
          resizeMode={resizeMode}
        />
      ) : (
        <img src={source.web} style={tw.style(style as string)} alt="Logo" />
      )}
    </>
  );
};
