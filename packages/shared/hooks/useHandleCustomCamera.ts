import {useRef, useState} from 'react';
import {useConfigRouting} from './routing';
import {ESignForSaleDocType} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const useHandleCustomCamera = () => {
  const {goBack} = useConfigRouting();

  const [pictures, setPictures] = useState<
    {
      id: string;
      uri: string;
    }[]
  >([]);
  const webcamRef = useRef<any>(null);

  const onPressFlash = () => {};

  const onPressChangeCamera = () => {};

  const onPressTakePicture = () => {};

  const onPressImages = ({docType}: {docType: ESignForSaleDocType}) => {
    console.log(docType);
  };

  const videoConstraints = false;

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
