import {useCallback, useMemo, useRef, useState} from 'react';
import {useConfigRouting} from './routing';
import Webcam from 'react-webcam';
import {convertBase64ToFile} from '@lfvn-customer/shared/utils/handleConvertBase64ToFile';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  DraftImagesESignForSale,
  ESignForSaleDocType,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {Dimensions} from 'react-native';

const useHandleCustomCamera = () => {
  const {goBack, appNavigate} = useConfigRouting();

  const [pictures, setPictures] = useState<
    {
      id: string;
      uri: string;
    }[]
  >([]);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
    'environment',
  );

  const videoConstraints = useMemo(() => {
    return {
      width: Dimensions.get('window').width,
      facingMode,
    };
  }, [facingMode]);
  const webcamRef = useRef<Webcam>(null);

  const onPressFlash = () => {};

  const onPressChangeCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const onPressTakePicture = useCallback(async () => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    if (imageSrc) {
      const uri = await convertBase64ToFile({
        base64: imageSrc,
      });
      setPictures(prev => [
        ...prev,
        {
          id: Date.now().toString() + Math.random().toString(),
          uri,
        },
      ]);
    }
  }, [webcamRef]);

  const onPressImages = ({docType}: {docType: ESignForSaleDocType}) => {
    const draftImages: DraftImagesESignForSale = {
      type: docType,
      links: pictures,
    };
    const encodedData = encodeURIComponent(JSON.stringify(draftImages));
    appNavigate(ScreenParamEnum.ImageSelected, {
      folderEncoded: encodedData,
    });
  };

  return {
    goBack,
    onPressFlash,
    onPressChangeCamera,
    onPressTakePicture,
    onPressImages,
    pictures,
    setPictures,
    webcamRef,
    videoConstraints,
  };
};
export default useHandleCustomCamera;
