import {useEffect, useMemo} from 'react';
import {
  useLazyActiveQuery,
  useResetPasswordFinishMutation,
  useVerifyOTPMutation,
} from '../redux/slices/apiSlices';
import useTranslations from './useTranslations';
import useShowToast from './useShowToast';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {API_SUCCESS_MESSAGE} from '../utils/constants';
import {ErrorResponseProps, VerifyOTPResponseProps} from '../types/services';
import useAuth from './useAuth';
import {useConfigRouting} from './routing';
import {setAppToken} from '../redux/slices/apiSlices/config';
import {OTPTypesEnum} from '../types';
import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';

const useHandleVerifyOTP = ({
  value,
  maxLengthOTP,
  type,
  authSeq,
  newPassword = '',
}: {
  value: string;
  maxLengthOTP: number;
  type: OTPTypesEnum;
  authSeq: string;
  newPassword?: string;
}) => {
  const [verifyOTP, {error: verifyOTPError}] = useVerifyOTPMutation();
  const [resetPasswordFinish, {error: resetPasswordFinishError}] =
    useResetPasswordFinishMutation();
  const [active, {error: activeError}] = useLazyActiveQuery();
  const {onHandleGetUserProfile} = useAuth();
  const t = useTranslations();
  const {handleShowToast} = useShowToast();

  const {appNavigate} = useConfigRouting();

  const error = useMemo(() => {
    return verifyOTPError || resetPasswordFinishError || activeError;
  }, [verifyOTPError, resetPasswordFinishError, activeError]);

  useEffect(() => {
    if (error) {
      try {
        const data = (error as ErrorResponseProps)?.data;
        const errorCode = JSON.parse(data.detail).code;
        const responseCode = handleResponseOTPGenerateAPI(errorCode);
        if (responseCode.msg !== API_SUCCESS_MESSAGE) {
          if (responseCode.type === 'toast') {
            handleShowToast({
              msg: t(responseCode.msg),
              type: 'error',
            });
          }
        }
      } catch (error) {
        // handle cannot parse error
        handleShowToast({
          msg: t('ErrorCommon.message'),
          type: 'error',
        });
      }
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      try {
        if (value.length === maxLengthOTP) {
          const result =
            type === OTPTypesEnum.LOGIN_OTP
              ? await verifyOTP({
                  authSeq,
                  code: value,
                  type: 'AUTH',
                })
              : type === OTPTypesEnum.SIGN_UP
                ? await active({
                    key: authSeq,
                    otp: value,
                  })
                : await resetPasswordFinish({
                    key: authSeq,
                    otp: value,
                    newPassword,
                  });
          if (result.data) {
            handleShowToast({
              msg:
                type === OTPTypesEnum.LOGIN_OTP
                  ? 'Đăng nhập thành công'
                  : type === OTPTypesEnum.SIGN_UP
                    ? 'Đăng ký thành công'
                    : 'Đổi mật khẩu thành công',
              type: 'success',
            });
            if (type === OTPTypesEnum.LOGIN_OTP) {
              setAppToken((result.data as VerifyOTPResponseProps)?.token);
              onHandleGetUserProfile();
              appNavigate(ScreenParamEnum.Home);
            } else {
              appNavigate(ScreenParamEnum.VerifyCustomerInfo);
            }
          }
        }
      } catch (error) {
        handleShowToast({
          msg: t('ErrorCommon.message'),
          type: 'error',
        });
      }
    })();
  }, [value]);

  return {};
};

export default useHandleVerifyOTP;
