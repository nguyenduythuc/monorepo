import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useLoginMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {setAppToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';
import {useConfigRouting} from './routing';
import useAuth from './useAuth';
import useLoginBiometrics from './useLoginBiometrics';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';
import {OTPTypesEnum} from '../types';
import {useDispatch} from 'react-redux';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '../redux/slices/loadingSlices';

const useLoginScreen = () => {
  const t = useTranslations();
  const fields = [FieldTestConfig.Account, FieldTestConfig.Password];
  const [login, {isError, isLoading}] = useLoginMutation();
  const {onHandleGetUserProfile} = useAuth();
  const {onPressBiometricLogin} = useLoginBiometrics();

  const {appNavigate} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const dispatch = useDispatch();

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  useEffect(() => {
    if (isError) {
      handleShowToast({
        msg: t('VerifyAccount.msgVerifyFail'),
        type: 'error',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingScreen());
    } else {
      dispatch(clearLoadingScreen());
    }
  }, [isLoading]);

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const {username, password} = getValues();
    const result = await login({
      username,
      password,
    });
    if (result.data?.id_token) {
      setAppToken(result.data?.id_token || '');
      onHandleGetUserProfile();
      appNavigate(ScreenParamEnum.Home);
    }
  });

  const onPressOTPLogin = () => {
    appNavigate(ScreenParamEnum.VerifyAccount, {
      type: OTPTypesEnum.LOGIN_OTP,
    });
  };

  const onPressSignUp = () => {
    appNavigate(ScreenParamEnum.SignUp);
  };

  const onPressForgotPassword = () => {
    appNavigate(ScreenParamEnum.VerifyAccount, {
      type: OTPTypesEnum.RESET_PASSWORD,
    });
  };

  return {
    reset,
    renderFrom,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    onPressSubmit,
    isError,
    isLoading,
    onPressOTPLogin,
    onPressSignUp,
    onPressForgotPassword,
    onPressBiometricLogin,
  };
};

export default useLoginScreen;
