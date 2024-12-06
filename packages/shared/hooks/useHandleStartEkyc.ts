import {
  ekycDataType,
  NFCResultType,
  OCRResultType,
  webEkycDataType,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';
import useShowToast from './useShowToast';
import useHandleSaveFile from './useHandleSaveFile';
import RNTrueID from 'react-native-true-id';
import {configInfo, EkycType} from '@lfvn-customer/shared/utils/TrueId';
import {Platform} from 'react-native';
import {parsePassportData} from '@lfvn-customer/shared/utils/ParseNFC';

const useHandleStartEkyc = () => {
  const {handleShowToast} = useShowToast();
  const {handleUploadUserResouce} = useHandleSaveFile();

  const closeEkycLabel = 'Close EKYC';

  const startEkyc = ({
    identityNumber,
    handleEkycSubmit,
    type,
  }: {
    identityNumber?: string;
    handleEkycSubmit: (
      ekycData: ekycDataType | webEkycDataType,
      selfieImg?: string,
    ) => void;
    type?: EkycType;
  }) => {
    RNTrueID.configure(configInfo(type ?? EkycType.NFC));
    if (type === 'verifyNFC') {
      RNTrueID.startNFCNoExtract('', '', '', (result: NFCResultType) => {
        if (result.code == 0) {
          // user close sdk
          handleShowToast({
            msg: closeEkycLabel,
            type: 'info',
          });
        } else if (result.code == 1) {
          // success
          const nfcRawData =
            Platform.OS === 'android' ? result.nfcData : result.nfcInfo;
          const data = parsePassportData(nfcRawData);
          console.log('final data', data);
          if (data?.passportImage && identityNumber) {
            handleUploadUserResouce({
              rawImage: data.passportImage,
              resourceType: 'IDCARD_SELFIE',
              identityNumber,
            });
          }
          handleEkycSubmit(data, data?.passportImage);
        } else {
          // handle error
          console.log('errorMesssage 1: ', result.errorMessage);
          handleShowToast({
            msg: result.errorMessage,
            type: 'error',
          });
        }
      });
    } else {
      RNTrueID.start(async (result: OCRResultType) => {
        console.log('result.idInfo', result);
        if (result.code == 0) {
          // user close sdk
          handleShowToast({
            msg: closeEkycLabel,
            type: 'info',
          });
        } else if (result.code == 1) {
          // success
          if (result?.rawImage?.front && identityNumber) {
            await handleUploadUserResouce({
              rawImage: result.rawImage?.front,
              resourceType: 'IDCARD_FRONT',
              identityNumber,
            });
          }
          if (result?.rawImage?.back && identityNumber) {
            await handleUploadUserResouce({
              rawImage: result.rawImage?.back,
              resourceType: 'IDCARD_BACK',
              identityNumber,
            });
          }
          if (result?.rawImage?.selfie && identityNumber) {
            await handleUploadUserResouce({
              rawImage: result.rawImage?.selfie,
              resourceType: 'IDCARD_SELFIE',
              identityNumber,
            });
          }
          const data: ekycDataType = result.idInfo;
          handleEkycSubmit(data, result.rawImage?.selfie);
        } else {
          // handle error
          console.log('errorMesssage : ', result.errorMessage);
          handleShowToast({
            msg: result.errorMessage,
            type: 'error',
          });
        }
      });
    }
  };

  return {startEkyc};
};

export default useHandleStartEkyc;
