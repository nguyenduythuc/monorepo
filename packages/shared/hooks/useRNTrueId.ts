import {EkycType} from '@lfvn-customer/shared/utils/TrueId';
import {
  WebOCRResultType,
  ekycDataType,
  webEkycDataType,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import useShowToast from './useShowToast';
import {useDispatch} from 'react-redux';
import {setVerifyAccount} from '@lfvn-customer/shared/redux/slices/verifyAccountSlices';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';
import {useEffect} from 'react';
import useHandleSaveFile from './useHandleSaveFile';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import downloadDraftContractApi from '@lfvn-customer/shared/redux/slices/apiSlices/downloadDraftContractApi';
import useHandleStartEkyc from './useHandleStartEkyc';

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
  const {showCommonErrorToast} = useShowToast();
  const dispatch = useDispatch();

  const {handleVerifyEKYCSubmit} = useHandleSaveFile();
  const {startEkyc} = useHandleStartEkyc();

  useEffect(() => {
    dispatch(clearLoadingScreen());
  }, []);

  const onPressStartEkyc = (type: EkycType) => {
    dispatch(setLoadingScreen());
    try {
      startEkyc({
        identityNumber: identityNumber ?? '',
        handleEkycSubmit,
        type,
      });
    } catch {
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  const submitAction = (type: EkycType) => {
    onPressStartEkyc(type);
  };

  const handleEkycSubmit = async (
    ekycData: ekycDataType | webEkycDataType,
    selfieImg?: string,
  ) => {
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
        const responseContract = await downloadDraftContractApi({
          token: dataSaleInfo?.tokenEsign ?? '',
          idCardNumber: dataSaleInfo?.idCardNumber ?? '',
          id: Number(dataSaleInfo?.saleImportId ?? 0),
          phoneNumber: dataSaleInfo?.phoneNumber ?? '',
        });
        if (responseContract) {
          appNavigate(ScreenParamEnum.ViewContractEsignForSale, {
            uri: responseContract,
            isVerifyEKYC: true,
          });
        } else {
          showCommonErrorToast();
          return;
        }
      } catch {
        showCommonErrorToast();
      } finally {
        dispatch(clearLoadingScreen());
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
