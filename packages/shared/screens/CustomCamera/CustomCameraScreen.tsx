import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Webcam from 'react-webcam';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon} from '@lfvn-customer/shared/components';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useHandleCustomCamera from '@lfvn-customer/shared/hooks/useHandleCustomCamera';
import {ESignForSaleDocType} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const CustomCameraScreen = ({docType}: {docType: ESignForSaleDocType}) => {
  const {theme} = useGetTheme();
  const {bgDanger500} = theme;

  const {
    goBack,
    onPressChangeCamera,
    // onPressFlash,
    onPressImages,
    pictures,
    onPressTakePicture,
    webcamRef,
    videoConstraints,
  } = useHandleCustomCamera();

  const renderHeader = () => (
    <View style={tw.style('bg-black p-4 flex-row justify-between')}>
      <TouchableOpacity
        style={tw.style(
          'w-[54px] h-[54px] rounded-full justify-center items-center',
        )}
        onPress={goBack}>
        <Icon name="arrow-left" color="white" disabled />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={tw.style(
          'w-[54px] h-[54px] rounded-full justify-center items-center bg-[#333333]',
        )}
        onPress={onPressFlash}>
        <Icon name="flash-icon" color="white" disabled />
      </TouchableOpacity> */}
    </View>
  );

  const renderBottom = () => (
    <View
      style={tw.style(
        'bg-black flex-1 flex-row justify-between items-center p-4',
      )}>
      <View style={tw.style('w-[72px] h-[72px] justify-end')}>
        {!!pictures.length && (
          <>
            <TouchableOpacity
              style={tw.style('w-[64px] h-[64px] justify-center items-center')}
              onPress={() => onPressImages({docType})}>
              <Image
                source={{uri: pictures[pictures.length - 1].uri}}
                style={tw.style('w-[64px] h-[64px] rounded')}
              />
            </TouchableOpacity>
            <View
              style={tw.style(
                `absolute right-0 top-0 w-6 h-6 rounded-full ${bgDanger500} justify-center items-center`,
              )}>
              <Text style={tw.style('text-xs text-white')}>
                {pictures.length}
              </Text>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity onPress={onPressTakePicture}>
        <Icon name="camera-iphone-icon" color="white" disabled />
      </TouchableOpacity>
      <View style={tw.style('w-[72px] h-[72px] justify-end')}>
        <TouchableOpacity
          style={tw.style(
            'w-[64px] h-[64px] rounded-full justify-center items-center bg-[#333333]',
          )}
          onPress={onPressChangeCamera}>
          <Icon name="change-camera-icon" color="white" disabled />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {renderHeader()}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMediaError={err => console.log('Camera error:', err)}
      />
      {renderBottom()}
    </>
  );
};

export default CustomCameraScreen;
