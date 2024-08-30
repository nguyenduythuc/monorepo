import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';
import {useConfigRouting} from './routing';

const useHome = () => {
  const {appNavigate} = useConfigRouting();

  const onPressLogin = () => {
    appNavigate(ScreenParamEnum.Login);
  };

  const onPressSignUp = () => {
    appNavigate(ScreenParamEnum.SignUp);
  };

  return {
    onPressLogin,
    onPressSignUp,
  };
};
export default useHome;
