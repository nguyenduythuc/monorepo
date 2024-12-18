import React from 'react';
import {Camera} from 'react-native-vision-camera';
// import {useDispatch} from 'react-redux';
import CameraVision from '@lfvn-customer/shared/components/common/CameraVision/CameraVision';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {UploadESignForSaleFile} from '../../types/services/eSignForSaleTypes';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
// import moment from 'moment';

export type ImageType = {
  path: string;
};

export const VisionCamera = ({
  // getPath,
  doc,
  // setDoc,
}: {
  // getPath: void;
  doc?: UploadESignForSaleFile;
  setDoc: ActionCreatorWithPayload<UploadESignForSaleFile, string>;
}) => {
  console.log('doc', doc);
  const camera = React.useRef<Camera>(null);
  const {goBack} = useConfigRouting();

  const [isFlash, setIsFlash] = React.useState(false);
  // const dispatch = useDispatch();

  const takePhoto = async () => {
    try {
      const result = await camera.current?.takePhoto({
        flash: isFlash ? 'on' : 'off',
        enableShutterSound: false,
        // qualityPrioritization: 'speed',
      });
      if (result) {
        const newImage: ImageType = {
          path: result.path,
        };
        handleFileChange(newImage.path);
        console.log('newImage', newImage);
        goBack();
      } else {
        console.log('Taking photo failed');
      }
    } catch (e) {
      console.warn('e', e);
    }
  };

  const handleFileChange = (imageUrl: string) => {
    // const imageUrl = URL.createObjectURL(file);
    // doc &&
    //   dispatch(
    //     setDoc({
    //       ...doc,
    //       links: [
    //         ...doc.links,
    //         {
    //           id: moment().format(),
    //           uri: imageUrl,
    //         },
    //       ],
    //     }),
    //   );
    console.log('imageUrl', imageUrl);
  };

  return (
    <CameraVision
      camera={camera}
      takePhoto={takePhoto}
      flash={isFlash}
      setFlash={() => setIsFlash(!isFlash)}
    />
  );
};
