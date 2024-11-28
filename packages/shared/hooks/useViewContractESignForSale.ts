import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useOtpGenerateBaseMutation} from '../redux/slices/apiSlices';
import useShowToast from './useShowToast';
import {useAppSelector} from '../redux/store';
import {OTPTypesEnum} from '../types';
import {useDispatch} from 'react-redux';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';

const useViewContractESignForSale = () => {
  const {appNavigate} = useConfigRouting();
  const {showCommonErrorToast} = useShowToast();

  const dispatch = useDispatch();

  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const [generateOtp] = useOtpGenerateBaseMutation();

  const onPressSubmit = async () => {
    Keyboard.dismiss();
    if (!dataSaleInfo) {
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

  return {
    onPressSubmit,
  };
};

export default useViewContractESignForSale;
