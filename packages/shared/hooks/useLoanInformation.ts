import {useEffect} from 'react';
import {useAppSelector} from '../redux/store';
import {ScreenParamEnum} from '../types/paramtypes';
import {useConfigRouting} from './routing';
import useHandleRequestPending from './useHandleRequestPending';

const useLoanInformation = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();

  const {onCheckRequestPending} = useHandleRequestPending();

  const onPressGoBack = () => {
    appNavigate(ScreenParamEnum.Home);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        onCheckRequestPending(user.login);
      }
    })();
  }, [user]);

  return {
    onPressGoBack,
  };
};
export default useLoanInformation;
