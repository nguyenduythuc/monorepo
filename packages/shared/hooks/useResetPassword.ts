import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useResetPasswordInitMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {useCustomForm} from '../components/Form/Form.hook';
import {OTPTypesEnum} from '../types';
import {useEffect, useMemo} from 'react';
import {ErrorResponseProps} from '@lfvn-customer/shared/types/services';
import {handleResponseOTPGenerateAPI} from '@lfvn-customer/shared/utils/handleResponseAPI';
import useShowToast from './useShowToast';
import {API_SUCCESS_MESSAGE} from '../utils/constants';

const useResetPassword = ({
  phoneNumber,
  identityNumber,
}: {
  phoneNumber: string;
  identityNumber: string;
}) => {
  const t = useTranslations();
  const [resetPasswordInit, {error, isLoading}] =
    useResetPasswordInitMutation();
  const {appNavigate} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const fields = useMemo(() => {
    return [FieldTestConfig.NewPassword, FieldTestConfig.ConfirmPassword];
  }, []);

  const {
    reset,
    renderFrom,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useCustomForm({
    fields,
    defaultValues: {},
  });

  const [newPassword, confirmPassword] = watch([
    'newPassword',
    'confirmPassword',
  ]);

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
          msg: t('VerifyAccount.msgVerifyFail'),
          type: 'error',
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (confirmPassword && confirmPassword !== newPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'ResetPassword.confirmPasswordNotMatch',
      });
    } else {
      clearErrors('confirmPassword');
    }
  }, [newPassword, confirmPassword]);

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const {newPassword} = getValues();
    const result = await resetPasswordInit({
      identityNumber,
      phoneNumber,
    });
    if (result.data) {
      appNavigate('enter-otp', {
        authSeq: result.data?.authSeq,
        phoneNumber,
        identityNumber,
        newPassword,
        type: OTPTypesEnum.RESET_PASSWORD,
      });
    }
  });

  return {
    reset,
    renderFrom,
    onPressSubmit,
    watch,
    control,
    setValue,
    getValues,
    isLoading,
  };
};

export default useResetPassword;
