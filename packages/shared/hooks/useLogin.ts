import {useDispatch} from 'react-redux';
import {useCustomForm} from '../components/Form/Form.hook';
import {FieldTestConfig} from '../components/Form/Form.utils';
import {useLoginMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {setToken} from '../redux/slices/authSlice';

const useLoginScreen = () => {
  const fields = [FieldTestConfig.Account, FieldTestConfig.Password];
  const [login, {isError, isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  console.log('isError', isError);
  console.log('isLoading', isLoading);

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  const onPressSubmit = handleSubmit(async () => {
    const {username, password} = getValues();
    const result = await login({
      username,
      password,
    });
    dispatch(setToken(result.data?.id_token));
  });

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
  };
};

export default useLoginScreen;
