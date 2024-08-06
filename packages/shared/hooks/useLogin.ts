import {useDispatch} from 'react-redux';
import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useLoginMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {setToken} from '@lfvn-customer/shared/redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenNavigationProps} from '../../mobile/src/types/paramtypes';
import {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {setAppToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';
import {useConfigRouting} from './routing';

const useLoginScreen = () => {
  const fields = [FieldTestConfig.Account, FieldTestConfig.Password];
  const [login, {isError, isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const {appNavigate} = useConfigRouting();

  useEffect(() => {
    // Clear token when start login
    dispatch(setToken(''));
  });

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

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
      appNavigate('SimulateScreen');
    }
  });

  const onPressOTPLogin = () => {
    navigation.navigate('VerifyAccount', {
      typpe: 'LOGIN_OTP',
    });
  };

  const onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onPressForgotPassword = () => {
    navigation.navigate('VerifyAccount', {
      typpe: 'FORGOT_PASSWORD',
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
  };
};

export default useLoginScreen;
