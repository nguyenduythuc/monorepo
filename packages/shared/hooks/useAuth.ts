import {useGetAccountMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {setUser, clearUser} from '@lfvn-customer/shared/redux/slices/authSlice';
import {mmkvStorage} from '@lfvn-customer/shared/utils/storage';
import {USER_LOGIN} from '@lfvn-customer/shared/utils/constants';
import {clearAppToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';
import {Platform} from 'react-native';
import {clearProductData} from '@lfvn-customer/shared/redux/slices/productSlices';

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
    dispatch(clearProductData());
    Platform.OS !== 'web' && mmkvStorage.removeItem(USER_LOGIN);
  };

  return {
    onHandleGetUserProfile,
    onHandleLogout,
  };
};

export default useAuth;
