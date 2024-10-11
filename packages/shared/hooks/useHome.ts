import {useCallback, useEffect} from 'react';
import {useAppSelector} from '../redux/store';
import {ScreenParamEnum} from '../types/paramtypes';
import {useConfigRouting} from './routing';
import useHandleRequestPending from './useHandleRequestPending';

const useHome = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();

  const {onCheckRequestPending} = useHandleRequestPending();

  const onPressLogin = () => {
    appNavigate(ScreenParamEnum.Login);
  };

  const onPressSignUp = () => {
    appNavigate(ScreenParamEnum.SignUp);
  };

  const onPressContinueRequestPending = () => {
    appNavigate(ScreenParamEnum.LoanInformation);
  };

  const handleCheckRequestPending = useCallback(async () => {
    if (user) {
      onCheckRequestPending(user.login);
    }
  }, [user]);

  useEffect(() => {
    handleCheckRequestPending();
  }, [handleCheckRequestPending]);

  return {
    onPressLogin,
    onPressSignUp,
    onPressContinueRequestPending,
  };
};
export default useHome;
