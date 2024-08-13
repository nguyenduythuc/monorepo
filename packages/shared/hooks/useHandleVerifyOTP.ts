import {useEffect} from 'react';
import {
  useLazyActiveQuery,
  useVerifyOTPMutation,
} from '../redux/slices/apiSlices';
import useTranslations from './useTranslations';
import useShowToast from './useShowToast';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {API_SUCCESS_MESSAGE} from '../utils/constants';
import {VerifyOTPResponseProps} from '../types/services';
import useAuth from './useAuth';
import {useDispatch} from 'react-redux';
import {useConfigRouting} from './routing';
import {setAppToken} from '../redux/slices/apiSlices/config';

const useHandleVerifyOTP = ({
  value,
  maxLengthOTP,
  type,
  authSeq,
}: {
  value: string;
  maxLengthOTP: number;
  type: string;
  authSeq: string;
}) => {
  const [verifyOTP, {isError: isVerifyError, isLoading: isVerifyLoading}] =
    useVerifyOTPMutation();
  const [active] = useLazyActiveQuery();
  const {onHandleGetUserProfile} = useAuth();
  const t = useTranslations();
  const {handleShowToast} = useShowToast();
  const dispatch = useDispatch();

  const {appNavigate} = useConfigRouting();

  useEffect(() => {
    if (isVerifyError) {
      handleShowToast({
        msg: t('EnterOTP.msgVerifyFail'),
        type: 'error',
      });
    }
  }, [isVerifyError]);

  useEffect(() => {
    (async () => {
      if (value.length === maxLengthOTP) {
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
            setAppToken((result.data as VerifyOTPResponseProps)?.token);
            onHandleGetUserProfile();
            appNavigate('home');
          } else {
            appNavigate('login');
          }
        }
      }
    })();
  }, [value]);

  return {};
};

export default useHandleVerifyOTP;
