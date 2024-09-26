import {useGetAccountMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {setUser, clearUser} from '../redux/slices/authSlice';
import {mmkvStorage} from '../utils/storage';
import {USER_LOGIN} from '../utils/constants';
import {clearAppToken} from '../redux/slices/apiSlices/config';
import {Platform} from 'react-native';

const useAuth = () => {
  const [getAccount] = useGetAccountMutation();

  const dispatch = useDispatch();

  const onHandleGetUserProfile = async () => {
    const getUser = await getAccount();
    dispatch(setUser(getUser.data));
    Platform.OS !== 'web' &&
      mmkvStorage.setItem(USER_LOGIN, getUser.data?.login);
  };

  const onHandleLogout = async () => {
    clearAppToken();
    dispatch(clearUser());
    Platform.OS !== 'web' && mmkvStorage.removeItem(USER_LOGIN);
  };

  return {
    onHandleGetUserProfile,
    onHandleLogout,
  };
};

export default useAuth;
