import {useDispatch} from 'react-redux';
import {
  useLazyActiveQuery,
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {API_SUCCESS_MESSAGE} from '../utils/constants';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {Keyboard} from 'react-native';
import useAuth from './useAuth';
import {setToken} from '../redux/slices/authSlice';
import {useConfigRouting} from './routing';
import useShowToast from './useShowToast';
import {VerifyOTPResponseProps} from '../types/services';

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
  const [verifyOTP, {isError: isVerifyError, isLoading: isVerifyLoading}] =
    useVerifyOTPMutation();
  const [resendOTP, {isError: isResendError, isLoading: isResendLoading}] =
    useResendOTPMutation();
  const [active] = useLazyActiveQuery();
  const {onHandleGetUserProfile} = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(180); // Đếm ngược từ 180 giây (3 phút)
  const [isCounting, setIsCounting] = useState(true);
  const [msgRequestError, setMsgRequestError] = useState('');

  const dispatch = useDispatch();
  const {appNavigate} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const onPressGoBack = () => {
    appNavigate('goBack');
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
    if (isResendError) {
      handleShowToast({
        msg: t('EnterOTP.msgResendFail'),
        type: 'error',
      });
    }
  }, [isResendError]);

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
        const result =
          type === 'LOGIN_OTP'
            ? await verifyOTP({
                authSeq,
                code: value,
                type: 'AUTH',
              })
            : type === 'SIGN_UP'
              ? await active({
                  key: authSeq,
                  otp: value,
                })
              : await verifyOTP({
                  authSeq,
                  code: value,
                  type: 'AUTH',
                }); // TODO : handle case forgot password
        const responseCode = handleResponseOTPGenerateAPI(result.data?.code);
        if (responseCode.msg !== API_SUCCESS_MESSAGE) {
          if (responseCode.type === 'toast') {
            handleShowToast({
              msg: t(responseCode.msg),
              type: 'error',
            });
          }
        } else {
          handleShowToast({
            msg:
              type === 'LOGIN_OTP'
                ? 'Đăng nhập thành công'
                : 'Đăng ký thành công', // TODO : handle case forgot password
            type: 'success',
          });
          if (type === 'LOGIN_OTP') {
            dispatch(setToken((result.data as VerifyOTPResponseProps)?.token));
            onHandleGetUserProfile();
            // navigation.popToTop();
          }
        }
      }
    })();
  }, [value]);

  const onPressResendOTP = async () => {
    Keyboard.dismiss();
    const result = await resendOTP({
      phoneNumber,
      identityNumber,
      authSeq,
      type: 'AUTH',
    });
    const responseCode = handleResponseOTPGenerateAPI(result.data?.data.code);
    if (responseCode.msg !== API_SUCCESS_MESSAGE) {
      if (responseCode.type === 'toast') {
        handleShowToast({
          msg: t(responseCode.msg),
          type: 'error',
        });
      }
    } else {
      setCounter(180); // Đặt lại bộ đếm về 180 giây (3 phút)
      setIsCounting(true);
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
