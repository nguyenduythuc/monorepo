import RNTrueID, { configInfo } from '@lfvn-customer/shared/utils/TrueId';
import { parsePassportData } from '../utils/ParseNFC';
import {
  NFCResultType,
  OCRResultType,
  ekycDataType,
} from '../types/services/verifyCustomerTypes';
import { useConfigRouting } from './routing';
import { ScreenParamEnum } from '../types/paramtypes';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import { Platform } from 'react-native';

const useRNTrueId = () => {
  const { appNavigate } = useConfigRouting();
  const { handleShowToast } = useShowToast();
  const t = useTranslations();

  const startEkyc = (type: string) => {
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
      console.log('pending')
    }

  };

  const submitAction = (type: string) => {
    startEkyc(type);
  };

  const handleEkycSubmit = (ekycData: ekycDataType) => {
    appNavigate(ScreenParamEnum.ReviewCustomerEKYCInfo, {
      ekycData: ekycData,
    });
  };

  return {
    submitAction,
  };
};

export default useRNTrueId;
