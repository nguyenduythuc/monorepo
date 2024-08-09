import {useRouter} from 'next/navigation';
import {RootParamListWeb} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const navigation = useRouter();

  const appNavigate = (
    nextScreen: keyof RootParamListWeb,
    params?: {[key: string]: string | number | boolean} | undefined,
  ) => {
    if (nextScreen === 'goBack') {
      navigation.back();
    } else {
      const queryString = params
        ? '?' + new URLSearchParams(params as Record<string, string>).toString()
        : '';
      console.log('nextScreenMobile', nextScreen);
      navigation.push(`${nextScreen}${queryString}`);
    }
  };

  return {appNavigate};
};
