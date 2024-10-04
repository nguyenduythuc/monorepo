import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Camera} from 'react-native-vision-camera';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
// import useAppPermissons from '../../hooks/useAppPermission'
import CameraVision from '../../components/common/CameraVision/CameraVision';
import {useConfigRouting} from '../../hooks';

//TODO: Implement component in progress

export type ImageType = {
  path: string;
};

export const VisionCamera = () => {
  const camera = React.useRef<Camera>(null);
  const {goBack} = useConfigRouting();

  const [isFlash, setIsFlash] = React.useState(false);
  const dispatch = useDispatch();
  const [currentAddress, setCurrentAddress] = React.useState<
    string | undefined
  >(undefined);
  const [pinGPS, setPinGPS] = useState(false);
  const [cameraPerDialog, setCameraPerDialog] = useState(false);

  // const { requestLocationPermission } = useAppPermissons()
  const t = useTranslations();

  // const onPressCloseModal = () => {
  //     setCameraPerDialog(false)
  // }

  const takePhoto = async () => {
    try {
      const result = await camera.current?.takePhoto({
        flash: isFlash ? 'on' : 'off',
        enableShutterSound: false,
        qualityPrioritization: 'speed',
      });
      if (result) {
        const newImage: ImageType = {
          path: result.path,
        };
        console.log('newImage', newImage);
        goBack();
      } else {
        console.log('Taking photo failed');
      }
    } catch (e) {
      console.warn('e', e);
    }
  };

  return (
    <CameraVision
      camera={camera}
      takePhoto={takePhoto}
      // imagePaths={paths}
      // onBack={() =>
      //   route.params?.createApl
      //     ? navigation.navigate('createAplOffline', { successCreateDoc: false })
      //     : navigation.goBack()
      // }
      flash={isFlash}
      setFlash={() => setIsFlash(!isFlash)}
      // isPinGPS={!disablePinGPS && pinGPS}
      // onPinGPS={route.params?.pinGPS ? onPressPinGPS : undefined}
      // onPressImage={onPressImage}
      // currentAddress={currentAddress}
    />
  );
};
