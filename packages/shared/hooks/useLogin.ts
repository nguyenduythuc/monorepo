import {useDispatch} from 'react-redux';
import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useLoginMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {setToken} from '@lfvn-customer/shared/redux/slices/authSlice';
import {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {setAppToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';
import {useConfigRouting} from './routing';
import useAuth from './useAuth';
import useLoginBiometrics from './useLoginBiometrics';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';

const useLoginScreen = () => {
  const t = useTranslations();
  const fields = [FieldTestConfig.Account, FieldTestConfig.Password];
  const [login, {isError, isLoading}] = useLoginMutation();
  const {onHandleGetUserProfile} = useAuth();
  const {onPressBiometricLogin} = useLoginBiometrics();

  const dispatch = useDispatch();
  const {appNavigate} = useConfigRouting();
  const {handleShowToast} = useShowToast();

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

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const {username, password} = getValues();
    const result = await login({
      username,
      password,
    });
    dispatch(setToken(result.data?.id_token));
    if (result.data?.id_token) {
      setAppToken(result.data?.id_token || '');
      // appNavigate('SimulateScreen');
      onHandleGetUserProfile();
      appNavigate(ScreenParamEnum.Home);
    }
  });

  const onPressOTPLogin = () => {
    appNavigate(ScreenParamEnum.VerifyAccount, {
      type: 'LOGIN_OTP',
    });
  };

  const onPressSignUp = () => {
    appNavigate(ScreenParamEnum.SignUp);
  };

  const onPressForgotPassword = () => {
    appNavigate(ScreenParamEnum.VerifyAccount, {
      type: 'FORGOT_PASSWORD',
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
