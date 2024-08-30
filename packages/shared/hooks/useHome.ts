import {useEffect} from 'react';
import {useAppSelector} from '../redux/store';
import {ScreenParamEnum} from '../types/paramtypes';
import {useConfigRouting} from './routing';
import {useRequestPendingByUserMutation} from '../redux/slices/apiSlices';
// import {PreCheckStatusEnum, PreCheckStepEnum} from '../types';

const useHome = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();

  const [requestPendingByUser] = useRequestPendingByUserMutation();

  const onPressLogin = () => {
    appNavigate(ScreenParamEnum.Login);
  };

  const onPressSignUp = () => {
    appNavigate(ScreenParamEnum.SignUp);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        const result = await requestPendingByUser({
          queryInput: {
            userId: user.login,
          },
        });
        console.log('result', result);
        // TODO: Need to wait real data in Pending api
        // if (result?.data) {
        //   if (
        //     result.data.currentStep === PreCheckStepEnum.PRE_CHECK &&
        //     result.data.status === PreCheckStatusEnum.PROCESSING
        //   ) {
        //     appNavigate(ScreenParamEnum.Precheck);
        //   } else {
        //     // TODO: Set data in Pending status component
        //   }
        // }
      }
    })();
  }, [user]);

  return {
    onPressLogin,
    onPressSignUp,
  };
};
export default useHome;
