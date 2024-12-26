import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  useOtpGenerateBaseMutation,
  useSaleSelfCertMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import useShowToast from './useShowToast';
import {useAppSelector} from '../redux/store';
import {OTPTypesEnum} from '../types';
import {useDispatch} from 'react-redux';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';
import {setDataSaleInfo} from '../redux/slices/eSignForSaleSlice';

const useViewContractESignForSale = () => {
  const {appNavigate} = useConfigRouting();
  const {showCommonErrorToast} = useShowToast();

  const dispatch = useDispatch();

  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const [generateOtp] = useOtpGenerateBaseMutation();
  const [saleSelfCert] = useSaleSelfCertMutation();

  const onPressSubmit = async ({
    isSignSuccess,
    uri,
  }: {
    isSignSuccess?: boolean;
    uri?: string;
  }) => {
    Keyboard.dismiss();
    if (!dataSaleInfo) {
      return;
    }
    if (isSignSuccess) {
      appNavigate(ScreenParamEnum.SignContractESignForSaleSuccess, {
        uri,
      });
      return;
    }
    const {idCardNumber, phoneNumber} = dataSaleInfo;
    try {
      dispatch(setLoadingScreen());
      const result = await generateOtp({
        phoneNumber: phoneNumber ?? '',
        identityNumber: idCardNumber ?? '',
        type: OTPTypesEnum.ESIGN,
      });
      if (result?.data) {
        const authSeq = result.data?.authSeq;
        if (authSeq) {
          appNavigate(ScreenParamEnum.EnterOtp, {
            authSeq,
            phoneNumber,
            identityNumber: idCardNumber ?? '',
            type: OTPTypesEnum.ESIGN,
          });
        }
      } else {
        showCommonErrorToast();
      }
    } catch {
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  const onHandleConfirmESign = async () => {
    if (!dataSaleInfo) {
      return;
    }
    const {idCardNumber, saleImportId, tokenEsign} = dataSaleInfo;
    const resultSaleSelfCert = await saleSelfCert({
      id: Number(saleImportId ?? 0),
      idCardNumber: idCardNumber ?? '',
      tokenEsign: tokenEsign ?? '',
    });
    if (resultSaleSelfCert?.data) {
      const billCode = resultSaleSelfCert.data.billCode;
      dispatch(
        setDataSaleInfo({
          ...dataSaleInfo,
          billCode,
        }),
      );
      return true;
    }
    return false;
  };

  return {
    onPressSubmit,
    onHandleConfirmESign,
  };
};

export default useViewContractESignForSale;
