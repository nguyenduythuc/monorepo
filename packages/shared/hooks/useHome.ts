import {useConfigRouting} from './routing';

const useHome = () => {
  const {appNavigate} = useConfigRouting();

  const onPressLogin = () => {
    appNavigate('login');
  };

  const onPressSignUp = () => {
    appNavigate('sign-up');
  };

  return {
    onPressLogin,
    onPressSignUp,
  };
};
export default useHome;
