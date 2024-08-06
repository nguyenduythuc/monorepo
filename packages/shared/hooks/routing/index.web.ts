import {useRouter} from 'next/navigation';
import {RootParamListWeb} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const navigation = useRouter();

  const appNavigate = (nextScreen: keyof RootParamListWeb) => {
    console.log('nextScreenMobile', nextScreen);
    navigation.push(nextScreen);
  };

  return {appNavigate};
};
