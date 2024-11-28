import RNTrueID, {
  EkycType,
  configInfo,
  webConfigInfo,
} from '@lfvn-customer/shared/utils/TrueId';
import {parsePassportData} from '@lfvn-customer/shared/utils/ParseNFC';
import {
  NFCResultType,
  OCRResultType,
  WebOCRResultType,
  ekycDataType,
  webEkycDataType,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import useShowToast from './useShowToast';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {setVerifyAccount} from '@lfvn-customer/shared/redux/slices/verifyAccountSlices';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';
import {useEffect, useState} from 'react';
import useHandleSaveFile from './useHandleSaveFile';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';

declare global {
  interface Window {
    TrueIDSDK: {
      start: (
        configEkyc: object,
        callBack: (result: WebOCRResultType) => void,
      ) => void;
    };
  }
}

const useRNTrueId = ({type}: {type?: OTPTypesEnum}) => {
  const {identityNumber} = useAppSelector(state => state.auth);
  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const {appNavigate} = useConfigRouting();
  const {showCommonErrorToast, handleShowToast} = useShowToast();
  const dispatch = useDispatch();

  const [selfieImg, setSelfieImg] = useState<string>();

  const {handleUploadUserResouce, handleVerifyEKYCSubmit} = useHandleSaveFile();

  useEffect(() => {
    dispatch(clearLoadingScreen());
  }, []);

  const startEkyc = (type: EkycType) => {
    try {
      if (Platform.OS !== 'web') {
        RNTrueID.configure(configInfo(type));

        if (type === 'verifyNFC') {
          RNTrueID.startNFCNoExtract('', '', '', (result: NFCResultType) => {
            if (result.code == 0) {
              // user close sdk
              handleShowToast({
                msg: 'Close EKYC',
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
              setSelfieImg(data?.passportImage);
              handleEkycSubmit(data);
            } else {
              // handle error
              console.log('errorMesssage : ', result.errorMessage);
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
                msg: 'Close EKYC',
                type: 'info',
              });
            } else if (result.code == 1) {
              dispatch(setLoadingScreen());

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
                setSelfieImg(result?.rawImage?.selfie);
                await handleUploadUserResouce({
                  rawImage: result.rawImage?.selfie,
                  resourceType: 'IDCARD_SELFIE',
                  identityNumber,
                });
              }
              const data: ekycDataType = result.idInfo;
              handleEkycSubmit(data);
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
      } else {
        // Todo set up true id web
        if (window?.TrueIDSDK && window?.TrueIDSDK.start) {
          let callBack = async (result: WebOCRResultType) => {
            console.log('SDK result', result);
            if (result.code == 0) {
              // user close sdk
              handleShowToast({
                msg: 'Close EKYC',
                type: 'info',
              });
            } else if (result.code == 1) {
              dispatch(setLoadingScreen());

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
                setSelfieImg(result?.rawImage?.selfie);
                await handleUploadUserResouce({
                  rawImage: result.rawImage?.selfie,
                  resourceType: 'IDCARD_SELFIE',
                  identityNumber,
                });
              }
              // success
              const data: ekycDataType = {
                fullname: result.idInfo?.name?.value,
                dob: result.idInfo?.dob?.value,
                ethnicity: result.idInfo?.ethnicity?.value,
                idNumber: result.idInfo?.id_number?.value,
                doi: result.ekycResult?.kyc_result.back?.given_date.value,
                gender: result.idInfo?.gender?.name,
                nationality: result.idInfo?.nationality?.value,
                origin: result.idInfo?.id_origin?.value,
                oldIdNumber: result.idInfo?.id_old_number?.value,
              };
              handleEkycSubmit(data);
              // console.log('final data', parsePassportData(result.nfcInfo));
            } else {
              // handle error
              console.log('errorMesssage : ', result.errorMessage);
              handleShowToast({
                msg: result.errorMessage,
                type: 'error',
              });
            }
          };
          window?.TrueIDSDK.start(webConfigInfo, callBack);
        } else {
          console.log('NULL');
        }
      }
    } catch {
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  const submitAction = (type: EkycType) => {
    startEkyc(type);
  };

  const handleEkycSubmit = async (ekycData: ekycDataType | webEkycDataType) => {
    dispatch(setVerifyAccount(ekycData));
    if (type === OTPTypesEnum.ESIGN) {
      try {
        const result = await handleVerifyEKYCSubmit({
          id: dataSaleInfo?.saleImportId ?? '',
          idCardNumber: dataSaleInfo?.idCardNumber ?? '',
          selfieImg: selfieImg ?? '',
          idCardIssuedAt: ekycData?.doi?.toString() ?? '',
          idCardIssuedBy: ekycData?.givenPlace?.toString() ?? '',
          tokenEsign: dataSaleInfo?.tokenEsign ?? '',
        });
        if (!result) {
          showCommonErrorToast();
          return;
        }
      } catch {
        showCommonErrorToast();
      }
    } else {
      appNavigate(ScreenParamEnum.ReviewCustomerEKYCInfo);
    }
  };

  return {
    submitAction,
  };
};

export default useRNTrueId;
