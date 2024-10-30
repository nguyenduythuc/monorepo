import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useChangePasswordRequestMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {useCustomForm} from '../components/Form/Form.hook';
import {OTPTypesEnum} from '../types';
import {useEffect, useMemo} from 'react';
import {ErrorResponseProps} from '@lfvn-customer/shared/types/services';
import useShowToast from './useShowToast';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

const useChangePassword = ({
  phoneNumber,
  identityNumber,
}: {
  phoneNumber: string;
  identityNumber: string;
}) => {
  const t = useTranslations();
  const [changePasswordRequest, {isLoading, error}] =
    useChangePasswordRequestMutation();
  const {appNavigate} = useConfigRouting();
  const {handleShowToast, showCommonErrorToast} = useShowToast();

  const fields = useMemo(() => {
    return [
      FieldTestConfig.CurrentPassword,
      FieldTestConfig.NewPassword,
      FieldTestConfig.ConfirmPassword,
    ];
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
      const data = (error as ErrorResponseProps)?.data;
      if (data.status === 400) {
        handleShowToast({
          type: 'error',
          msg: t('ChangePassword.changePasswordErr'),
        });
      } else {
        showCommonErrorToast();
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
    try {
      Keyboard.dismiss();
      const {currentPassword, newPassword} = getValues();
      const result = await changePasswordRequest({
        currentPassword,
        newPassword,
      });
      if (result.data) {
        appNavigate(ScreenParamEnum.EnterOtp, {
          authSeq: result.data?.authSeq,
          phoneNumber,
          identityNumber,
          newPassword,
          currentPassword,
          type: OTPTypesEnum.CHANGE_PASSWORD,
        });
      }
    } catch (error) {
      console.log('error change password', error);
      showCommonErrorToast();
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

export default useChangePassword;
