import {useDispatch} from 'react-redux';
import {
  useLazyActiveQuery,
  useOtpResendBaseMutation,
  useResendOTPMutation,
  useResendOTPSignContractMutation,
  useVerifyOTPMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {API_SUCCESS_MESSAGE} from '@lfvn-customer/shared/utils/constants';
import {handleResponseOTPGenerateAPI} from '@lfvn-customer/shared/utils/handleResponseAPI';
import {Keyboard} from 'react-native';
import useAuth from './useAuth';
import {setToken} from '@lfvn-customer/shared/redux/slices/authSlice';
import {useConfigRouting} from './routing';
import useShowToast from './useShowToast';
import {VerifyOTPResponseProps} from '@lfvn-customer/shared/types/services';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';

const CELL_COUNT = 6;
const useEnterOTP = ({
  authSeq,
  phoneNumber,
  identityNumber,
  type,
  t,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
  type: string;
  t: any;
}) => {
  const [verifyOTP, {isError: isVerifyError}] = useVerifyOTPMutation();
  const [resendOTP, {isError: isResendError}] = useResendOTPMutation();
  const [resendOTPESign, {isError: isResendESignError}] =
    useOtpResendBaseMutation();
  const [resendOTPSignContract, {isError: isResendOTPSignContracError}] =
    useResendOTPSignContractMutation();
  const [active] = useLazyActiveQuery();
  const {onHandleGetUserProfile} = useAuth();

  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(180); // Đếm ngược từ 180 giây (3 phút)
  const [isCounting, setIsCounting] = useState(true);
  const [msgRequestError, setMsgRequestError] = useState('');

  const dispatch = useDispatch();
  const {goBack} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const onPressGoBack = () => {
    goBack();
  };

  useEffect(() => {
    if (isVerifyError) {
      handleShowToast({
        msg: t('EnterOTP.msgVerifyFail'),
        type: 'error',
      });
    }
  }, [isVerifyError]);

  useEffect(() => {
    if (isResendError || isResendESignError || isResendOTPSignContracError) {
      handleShowToast({
        msg: t('EnterOTP.msgResendFail'),
        type: 'error',
      });
    }
  }, [isResendError, isResendESignError, isResendOTPSignContracError]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0) {
      setIsCounting(false);
    }
    return () => clearTimeout(timer);
  }, [counter, isCounting]);

  useEffect(() => {
    (async () => {
      if (value.length === CELL_COUNT) {
        let result;
        switch (type) {
          case OTPTypesEnum.LOGIN_OTP:
            result = await verifyOTP({
              authSeq,
              code: value,
              type: 'AUTH',
            });
            break;

          case OTPTypesEnum.SIGN_UP:
            result = await active({
              key: authSeq,
              otp: value,
            });
            break;

          // eslint-disable-next-line sonarjs/no-duplicated-branches
          default:
            result = await verifyOTP({
              authSeq,
              code: value,
              type: 'AUTH',
            });
            break;
        }
        const responseCode = handleResponseOTPGenerateAPI(result.data?.code);
        if (responseCode.msg !== API_SUCCESS_MESSAGE) {
          if (responseCode.type === 'toast') {
            handleShowToast({
              msg: t(responseCode.msg),
              type: 'error',
            });
          }
        } else {
          let msgSuccess = '';
          switch (type) {
            case OTPTypesEnum.LOGIN_OTP:
              msgSuccess = 'Login.loginSuccess';
              dispatch(
                setToken((result.data as VerifyOTPResponseProps)?.token),
              );
              onHandleGetUserProfile();
              break;
            case OTPTypesEnum.SIGN_UP:
              msgSuccess = 'SignUp.signUpSuccess';
              break;
            case OTPTypesEnum.ESIGN:
              break;
            default:
              msgSuccess = '';
              break;
          }
          if (msgSuccess) {
            handleShowToast({
              msg: msgSuccess,
              type: 'success',
            });
          }
        }
      }
    })();
  }, [value]);

  const onPressResendOTP = async () => {
    Keyboard.dismiss();
    let result;
    switch (type) {
      case OTPTypesEnum.LOGIN_OTP:
        result = await resendOTP({
          phoneNumber,
          identityNumber,
          authSeq,
          type: 'AUTH',
        });
        break;

      case OTPTypesEnum.ESIGN:
        result = await resendOTPESign({
          phoneNumber: dataSaleInfo?.phoneNumber ?? '',
          identityNumber: dataSaleInfo?.idCardNumber ?? '',
          authSeq,
          type: OTPTypesEnum.ESIGN,
        });
        break;
      case OTPTypesEnum.CONFIRM_ESIGN:
        result = await resendOTPSignContract({
          id: Number(dataSaleInfo?.saleImportId ?? 0),
          idCardNumber: dataSaleInfo?.idCardNumber ?? '',
          tokenEsign: dataSaleInfo?.tokenEsign ?? '',
        });
        break;
      // eslint-disable-next-line sonarjs/no-duplicated-branches
      default:
        result = await resendOTP({
          phoneNumber,
          identityNumber,
          authSeq,
          type: 'AUTH',
        });
        break;
    }
    if (result.data) {
      setCounter(180);
      setIsCounting(true);
      setMsgRequestError('');
    }
  };

  return {
    onPressGoBack,
    onPressResendOTP,
    value,
    setValue,
    counter,
    isCounting,
    CELL_COUNT,
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
  };
};

export default useEnterOTP;
