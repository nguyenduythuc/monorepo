import RNTrueID, { EkycType, configInfo, webConfigInfo } from '@lfvn-customer/shared/utils/TrueId';
import { parsePassportData } from '../utils/ParseNFC';
import {
  NFCResultType,
  OCRResultType,
  WebOCRResultType,
  ekycDataType,
  webEkycDataType,
} from '../types/services/verifyCustomerTypes';
import { useConfigRouting } from './routing';
import { ScreenParamEnum } from '../types/paramtypes';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { setVerifyAccount } from '@lfvn-customer/shared/redux/slices/verifyAccountSlices';

declare global {
  interface Window {
    TrueIDSDK: {
      start: (configEkyc: object, callBack: (result: WebOCRResultType) => void) => void;
    };
  }
}

const useRNTrueId = () => {
  const { appNavigate } = useConfigRouting();
  const { handleShowToast } = useShowToast();
  const t = useTranslations();
  const dispatch = useDispatch();

  const startEkyc = (type: EkycType) => {
    if (Platform.OS !== 'web') {
      RNTrueID.configure(configInfo(type));

      if (type === 'verifyNFC') {
        RNTrueID.startNFCNoExtract('', '', '', (result: NFCResultType) => {
          console.log('result', result);
          if (result.code == 0) {
            // user close sdk
            handleShowToast({
              msg: 'Close EKYC',
              type: 'info',
            });
            console.log()
          } else if (result.code == 1) {
            // success
            const data = parsePassportData(result.nfcInfo);
            console.log('final data', parsePassportData(result.nfcInfo));
            handleEkycSubmit(data);
          } else {
            // handle error
            console.log('errorMesssage : ', result.errorMessage);
          }
        });
      } else {
        RNTrueID.start((result: OCRResultType) => {
          console.log('result.idInfo', result);
          if (result.code == 0) {
            // user close sdk
            handleShowToast({
              msg: 'Close EKYC',
              type: 'info',
            });
          } else if (result.code == 1) {
            // success
            const data: ekycDataType = result.idInfo;
            handleEkycSubmit(data);
            // console.log('final data', parsePassportData(result.nfcInfo));
          } else {
            // handle error
            console.log('errorMesssage : ', result.errorMessage);
          }
        });
      }
    } else {
      // Todo set up true id web
      if (window?.TrueIDSDK && window?.TrueIDSDK.start) {

        let callBack = (result: WebOCRResultType) => {
          console.log("SDK result", result)
          if (result.code == 0) {
            // user close sdk
            handleShowToast({
              msg: 'Close EKYC',
              type: 'info',
            });
          } else if (result.code == 1) {
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
          }
        }
        window?.TrueIDSDK.start(webConfigInfo, callBack)
      } else {
        console.log("NULL")
      }
    }

  };

  const submitAction = (type: EkycType) => {
    startEkyc(type);
  };

  const handleEkycSubmit = (ekycData: ekycDataType | webEkycDataType) => {
    dispatch(setVerifyAccount(ekycData))
    appNavigate(ScreenParamEnum.ReviewCustomerEKYCInfo);
  };

  return {
    submitAction,
  };
};

export default useRNTrueId;
