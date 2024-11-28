import {useCallback, useEffect, useMemo} from 'react';
import {
  useCheckEKYCMutation,
  useLazyActiveQuery,
  useOtpVerifyBaseMutation,
  useResetPasswordFinishMutation,
  useVerifyChangePasswordMutation,
  useVerifyOTPMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import useTranslations from './useTranslations';
import useShowToast from './useShowToast';
import {handleResponseOTPGenerateAPI} from '@lfvn-customer/shared/utils/handleResponseAPI';
import {API_SUCCESS_MESSAGE} from '@lfvn-customer/shared/utils/constants';
import {
  ErrorResponseProps,
  VerifyOTPResponseProps,
} from '@lfvn-customer/shared/types/services';
import useAuth from './useAuth';
import {useConfigRouting} from './routing';
import {setAppToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';

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
  const [verifyOTPESign, {isError: isVerifyErrorESign}] =
    useOtpVerifyBaseMutation();
  const [checkEKYC] = useCheckEKYCMutation();
  const [active, {error: activeError}] = useLazyActiveQuery();
  const {onHandleGetUserProfile} = useAuth();
  const t = useTranslations();
  const {handleShowToast, showCommonErrorToast} = useShowToast();

  const {appNavigate} = useConfigRouting();
  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const error = useMemo(() => {
    return (
      verifyOTPError ||
      resetPasswordFinishError ||
      activeError ||
      verifyChangePasswordError ||
      isVerifyErrorESign
    );
  }, [
    verifyOTPError,
    resetPasswordFinishError,
    activeError,
    verifyChangePasswordError,
    isVerifyErrorESign,
  ]);

  useEffect(() => {
    if (error) {
      const data = (error as ErrorResponseProps)?.data;
      if (data?.status === 400 && data?.detail === 'Incorrect password') {
        // handle for only incorrect password
        handleShowToast({
          type: 'error',
          msg: t('ChangePassword.changePasswordErr'),
        });
      } else {
        const errorCode = JSON.parse(data?.detail).code;
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
          case OTPTypesEnum.ESIGN:
            result = await verifyOTPESign({
              authSeq,
              code: value,
              type: OTPTypesEnum.ESIGN,
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
            case OTPTypesEnum.ESIGN:
              const resultCheckEKYC = await checkEKYC({
                id: Number(dataSaleInfo?.saleImportId ?? 0),
                idCardNumber: dataSaleInfo?.idCardNumber ?? '',
              });
              if (resultCheckEKYC?.data) {
                // đã verify eKYC
              } else {
                appNavigate(ScreenParamEnum.VerifyCustomerInfo, {
                  type: OTPTypesEnum.ESIGN,
                });
              }
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
