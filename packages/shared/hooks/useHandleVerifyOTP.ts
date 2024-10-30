import {useCallback, useEffect, useMemo} from 'react';
import {
  useLazyActiveQuery,
  useResetPasswordFinishMutation,
  useVerifyChangePasswordMutation,
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
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

const useHandleVerifyOTP = ({
  value,
  maxLengthOTP,
  type,
  authSeq,
  newPassword = '',
  currentPassword = '',
}: {
  value: string;
  maxLengthOTP: number;
  type: OTPTypesEnum;
  authSeq: string;
  newPassword?: string;
  currentPassword?: string;
}) => {
  const [verifyOTP, {error: verifyOTPError}] = useVerifyOTPMutation();
  const [resetPasswordFinish, {error: resetPasswordFinishError}] =
    useResetPasswordFinishMutation();
  const [verifyChangePassword, {error: verifyChangePasswordError}] =
    useVerifyChangePasswordMutation();
  const [active, {error: activeError}] = useLazyActiveQuery();
  const {onHandleGetUserProfile} = useAuth();
  const t = useTranslations();
  const {handleShowToast, showCommonErrorToast} = useShowToast();

  const {appNavigate} = useConfigRouting();

  const error = useMemo(() => {
    return (
      verifyOTPError ||
      resetPasswordFinishError ||
      activeError ||
      verifyChangePasswordError
    );
  }, [
    verifyOTPError,
    resetPasswordFinishError,
    activeError,
    verifyChangePasswordError,
  ]);

  useEffect(() => {
    if (error) {
      const data = (error as ErrorResponseProps)?.data;
      if (data.status === 400 && data.detail === 'Incorrect password') {
        // handle for only incorrect password
        handleShowToast({
          type: 'error',
          msg: t('ChangePassword.changePasswordErr'),
        });
      } else {
        const errorCode = JSON.parse(data.detail).code;
        const responseCode = handleResponseOTPGenerateAPI(errorCode);
        if (
          responseCode.msg !== API_SUCCESS_MESSAGE &&
          responseCode.type === 'toast'
        ) {
          handleShowToast({
            msg: t(responseCode.msg),
            type: 'error',
          });
        }
      }
    }
  }, [error]);

  const handleVerifyOTP = useCallback(async () => {
    try {
      if (value.length === maxLengthOTP) {
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
          case OTPTypesEnum.CHANGE_PASSWORD:
            result = await verifyChangePassword({
              currentPassword,
              newPassword,
              key: authSeq,
              otp: value,
            });
            break;
          case OTPTypesEnum.RESET_PASSWORD:
            result = await resetPasswordFinish({
              key: authSeq,
              otp: value,
              newPassword,
            });
            break;
          default:
            break;
        }
        if (result?.data) {
          handleShowToast({
            msg:
              type === OTPTypesEnum.LOGIN_OTP
                ? t('Login.loginSuccess')
                : type === OTPTypesEnum.SIGN_UP
                  ? t('SignUp.signUpSuccess')
                  : t('ChangePassword.changePasswordSuccess'),
            type: 'success',
          });
          switch (type) {
            case OTPTypesEnum.LOGIN_OTP:
              setAppToken((result.data as VerifyOTPResponseProps)?.token);
              onHandleGetUserProfile();
              appNavigate(ScreenParamEnum.Home);
              break;
            case OTPTypesEnum.CHANGE_PASSWORD:
              onHandleGetUserProfile();
              appNavigate(ScreenParamEnum.Home);
              break;
            case OTPTypesEnum.RESET_PASSWORD:
              appNavigate(ScreenParamEnum.Login);
              break;
            default:
              appNavigate(ScreenParamEnum.VerifyCustomerInfo);
              break;
          }
        }
      }
    } catch (error) {
      console.log('error handle verify otp', error);
      showCommonErrorToast();
    }
  }, [value, maxLengthOTP, type, authSeq, newPassword, currentPassword, t]);

  useEffect(() => {
    handleVerifyOTP();
  }, [handleVerifyOTP]);

  return {};
};

export default useHandleVerifyOTP;
