import {useGetAccountMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/authSlice';
import {mmkvStorage} from '../utils/storage';
import {USER_LOGIN} from '../utils/constants';

const useAuth = () => {
  const [getAccount] = useGetAccountMutation();

  const dispatch = useDispatch();

  const onHandleGetUserProfile = async () => {
    const getUser = await getAccount();
    dispatch(setUser(getUser.data));
    mmkvStorage.setItem(USER_LOGIN, getUser.data?.login);
  };

  return {
    onHandleGetUserProfile,
  };
};

export default useAuth;
